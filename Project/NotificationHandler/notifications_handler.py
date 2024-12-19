from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import ssl
import os
import logging
import pika
import json
from dotenv import load_dotenv
import threading
import time
from pymongo import MongoClient
import os
from datetime import datetime, timedelta
import math
from typing import List, Tuple, Dict




client = MongoClient("mongodb://carbox:mySecretPassword@db:27017/carbox?authSource=admin")
db = client["carbox"] 
users_collection = db["Users"]


def get_user_email_by_ecu_id(car_ecu_id: str) -> str:
    """Retrieve the user's email based on the car ECU ID."""
    emails_list = []
    try:
        user = users_collection.find({
            "carsList": {
                "$elemMatch": { "0": car_ecu_id }
            }
        })
        for u in user:
            if u:
                emails_list.append(u.get("email"))
            else:
                logging.error(f"No users found for car ECU ID: {car_ecu_id}")
                return None
    except Exception as e:
        logging.error(f"Error retrieving user email: {e}")
        return None
            
    return emails_list
    



load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDR")
EMAIL_PASSW = os.getenv("EMAIL_PASSW")

credentials = pika.PlainCredentials('carbox', 'vroom')
connection=pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq', credentials=credentials))
channel=connection.channel()
channel.queue_declare(queue='carbox', durable=True)
logging.basicConfig(level=logging.INFO)


app = FastAPI()

class Notification(BaseModel):
    car_id: str
    errors: list
    timestamp: str


def send_email(to_email: str, subject: str, body: str):
    """Sends an email notification."""
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = to_email
        msg['Subject'] = subject
        # msg.attach(MIMEText(body, 'plain'))
        msg.attach(MIMEText(body, 'html'))
        
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(EMAIL_ADDRESS, EMAIL_PASSW)
            server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
        logging.info(f"Notification sent to {to_email}")
    except Exception as e:
        logging.error(f"Failed to send email: {e}")
        


from threading import Lock

last_notification_time = {}
notification_lock = Lock()

def handle_car_turned_on(message: dict):
    """Handles a car being turned on and asks the user if it was them."""

    if not message:
        logging.error("Received an empty message. Skipping processing.")
        return

    ecu_id = message.get('car_id')
    if not ecu_id:
        logging.error("ECU ID is missing in the message. Skipping processing.")
        return

    car_status = message.get('car_status')
    if car_status != True:
        logging.error(f"Invalid car status: {car_status}. Skipping processing.")
        return

    event_time = message.get('timestamp')
    if not event_time:
        logging.error(f"No timestamp found for car {ecu_id}. Skipping.")
        return

    with notification_lock:
        current_time = datetime.now()
        last_time = last_notification_time.get(ecu_id)

        if last_time and (current_time - last_time) < timedelta(hours=2):
            logging.info(f"Notification for car {ecu_id} was sent recently. Skipping.")
            return

        last_notification_time[ecu_id] = current_time

    user_email_list = get_user_email_by_ecu_id(ecu_id)
    if not user_email_list:
        logging.error(f"No emails found for car {ecu_id}. Skipping notification.")
        return

    subject = f"Car {ecu_id} Turned On. Was It You?"
    # Ill get this body better formatted later on
    body = f"""
    <html>
    <body>
    <p>Hello,</p>
    <p>We noticed that your car (ID: {ecu_id}) was turned on at {event_time}. 
    If this wasn't you, please click the "No" button below, and we will direct you to the emergency services.</p>
    <p>Was it you who turned on the car?</p>
    
    <a href="http://deti-ies-09.ua.pt">
        <button style="padding: 10px 20px; font-size: 16px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">Yes</button>
    </a>
    
    <a href="https://www.policiajudiciaria.pt/">
        <button style="padding: 10px 20px; font-size: 16px; background-color: #f44336; color: white; border: none; cursor: pointer;">No</button>
    </a>

    <p>If you did not turn on the car, please click "No" to contact emergency services.</p>
    </body>
    </html>
    """

    for user_email in user_email_list:
        send_email(user_email, subject, body)
        logging.info(f"Notification sent to {user_email} for car {ecu_id}.")



def remind_inspection_date(ecu_id: str):
    """
    Checks if the car's inspection is due in 30 days and sends an email reminder.
    Only sends the reminder once per day.
    """
    try:
        car_data = db["Cars"].find_one({"ecu_id": ecu_id})

        if not car_data:
            logging.error(f"No data found for ECU ID: {ecu_id}.")
            return

        last_reminder_sent = car_data.get("last_reminder_sent")
        today = datetime.now().strftime('%Y-%m-%d')

        if last_reminder_sent == today:
            logging.info(f"Reminder for car {ecu_id} already sent today.")
            return  

        last_revision_date = car_data.get("last_revision")
        if not last_revision_date:
            logging.error(f"No last_revision date found for car {ecu_id}.")
            return

        last_revision_date = datetime.strptime(last_revision_date, "%Y-%m-%d")
        next_inspection_date = datetime.now() + timedelta(365)
        days_remaining = (next_inspection_date - datetime.now()).days

        if days_remaining <= 30:  
            user_email_list = get_user_email_by_ecu_id(ecu_id)
            if not user_email_list:
                logging.error(f"No emails found for car {ecu_id}. Skipping reminder.")
                return

            subject = f"Reminder: Car {ecu_id} Inspection Due in {days_remaining} Days"
            body = (
                f"Your car (ID: {ecu_id}, Model: {car_data.get('brand')} {car_data.get('model')}) "
                f"is due for inspection on {next_inspection_date.strftime('%Y-%m-%d')}.\n\n"
                "Please schedule your inspection soon to avoid penalties.\n\n"
                "Thank you!"
            )

            for user_email in user_email_list:
                send_email(user_email, subject, body)
                logging.info(f"Inspection reminder sent to {user_email} for car {ecu_id}.")

            db["Cars"].update_one(
                {"ecu_id": ecu_id},
                {"$set": {"last_reminder_sent": today}}
            )
    except Exception as e:
        logging.error(f"Error in remind_inspection_date for car {ecu_id}: {e}")
        

MECHANICS = [
    {"name": "Lisbon Auto Repair", "location": "38.736946,-9.142685"},  # Lisbon
    {"name": "Porto Car Service", "location": "41.157944,-8.629105"},  # Porto
    {"name": "Faro Auto Mechanics", "location": "37.017953,-7.935175"},  # Faro
    {"name": "Coimbra Repair Hub", "location": "40.211002,-8.429088"},  # Coimbra
    {"name": "Braga Vehicle Experts", "location": "41.550323,-8.420052"},  # Braga
]

def haversine(coord1: Tuple[float, float], coord2: Tuple[float, float]) -> float:
    """
    Calculate the great-circle distance between two points on the Earth using the Haversine formula.
    Coordinates are given as (latitude, longitude) tuples in decimal degrees.
    Returns the distance in kilometers.
    """
    R = 6371 

    lat1, lon1 = coord1
    lat2, lon2 = coord2

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c

def find_closest_mechanic(car_location: str) -> Dict[str, str]:
    """
    Find the closest mechanic to the car's location.
    """
    car_lat, car_lon = map(float, car_location.split(','))
    car_coords = (car_lat, car_lon)

    closest_mechanic = None
    min_distance = float('inf')

    for mechanic in MECHANICS:
        mech_lat, mech_lon = map(float, mechanic["location"].split(','))
        distance = haversine(car_coords, (mech_lat, mech_lon))

        if distance < min_distance:
            min_distance = distance
            closest_mechanic = mechanic

    return {
        "name": closest_mechanic["name"],
        "location": closest_mechanic["location"],
        "distance": round(min_distance, 2)
    }

def send_mechanical_info(message: dict):
    """
    Sends an email to notify the user of the closest mechanic if the car has errors.
    """
    try:
        car_id = message.get("car_id")
        car_location = message.get("location")
        errors = message.get("errors", [])

        if errors == []:
            logging.info(f"No errors detected for car {car_id}. Skipping mechanic info notification.")
            return

        closest_mechanic = find_closest_mechanic(car_location)
        mechanic_name = closest_mechanic["name"]
        mechanic_coords = closest_mechanic["location"]
        distance = closest_mechanic["distance"]

        google_maps_url = f"https://www.google.com/maps/dir/{car_location}/{mechanic_coords}"

        subject = f"Mechanical Assistance for Car {car_id}"
        body = f"""
        <html>
        <body>
            <h2>Car ID: {car_id} Requires Mechanical Assistance</h2>
            <p>We detected the following errors in your car:</p>
            <ul>
                {''.join([f'<li>{error}</li>' for error in errors])}
            </ul>
            <p>The closest mechanic is:</p>
            <h3>{mechanic_name}</h3>
            <p>Location: {mechanic_coords} ({distance} km away)</p>
            <p><a href="{google_maps_url}" style="color: #0066cc; text-decoration: none;">Click here for directions</a></p>
            <p>Thank you for using our service.</p>
        </body>
        </html>
        """

        user_email_list = get_user_email_by_ecu_id(car_id)
        if not user_email_list:
            logging.error(f"No emails found for car {car_id}. Skipping mechanic info notification.")
            return

        for user_email in user_email_list:
            send_email(user_email, subject, body)
            logging.info(f"Mechanic information email sent to {user_email} for car {car_id}.")

    except Exception as e:
        logging.error(f"Error in send_mechanical_info: {e}")


# For oil levels, low battery or high motor temperature
def process_notification_others(message: dict):
    """
    Processes a notification by evaluating the car's data from the message
    and triggering alerts based on threshold breaches.
    """
    if not message:
        logging.error("Received an empty message. Skipping processing.")
        return

    ecu_id = message.get('car_id')
    if not ecu_id:
        logging.error("ECU ID is missing in the message. Skipping processing.")
        return
    
    
    # We'll do it here since this is other notifications
    remind_inspection_date(ecu_id)

    # These values need to be reavaluated in the data generator
    oil_threshold = 20
    battery_threshold = 20
    motor_temp_threshold = 50

    alerts = []

    if message.get('oil_level') < oil_threshold:
        alerts.append({
            "type": "low_oil",
            "details": f"Oil level is critically low at {message['oil_level']}%."
        })
    if message.get('battery_charge') < battery_threshold:
        alerts.append({
            "type": "low_battery",
            "details": f"Battery charge is critically low at {message['battery_charge']}%."
        })
    if message.get('motor_temperature') > motor_temp_threshold:
        alerts.append({
            "type": "high_motor_temp",
            "details": f"Motor temperature is dangerously high at {message['motor_temperature']}°C."
        })

    for alert in alerts:
        alert_type = alert["type"]
        alert_details = alert["details"]

        user_email_list = get_user_email_by_ecu_id(ecu_id)
        if not user_email_list:
            logging.error(f"No emails found for car {ecu_id}. Skipping notification for {alert_type}.")
            continue

        subject = f"Critical Alert for Car {ecu_id}"
        body = (
            f"Alert detected in your car (ID: {ecu_id}) at {message.get('timestamp', 'N/A')}:\n\n"
            f"**{alert_details}**\n\n"
            "Please take immediate action to address this issue."
        )

        for user_email in user_email_list:
            send_email(user_email, subject, body)
            logging.info(f"Notification sent to {user_email} for {alert_type} in car {ecu_id}.")



def process_notification_errors(message: dict):
    """Processes notification messages from RabbitMQ."""
    car_id = message.get("car_id")
    errors = message.get("errors")
    timestamp = message.get("timestamp")

    if not errors:
        logging.info(f"No errors to report for car {car_id}. Skipping email.")
        return  

    car_ecu_id = car_id  

    user_email_list = get_user_email_by_ecu_id(car_ecu_id)
    if user_email_list == []:
        logging.error(f"No email found for car {car_id} (ECU ID: {car_ecu_id}). Skipping email.")
        return
    
    for user_email in user_email_list:
        subject = f"Car Alert: {car_id}"
        body = f"Errors detected in car {car_id} at {timestamp}:\n" + "\n".join(errors)
        send_email(user_email, subject, body)


def start_rabbitmq_consumer():
    """Starts RabbitMQ consumer to listen for incoming messages."""
    try:
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='rabbitmq', credentials=credentials)
        )
        channel = connection.channel()
        channel.queue_declare(queue='carbox', durable=True)
        

        def callback(ch, method, properties, body):
            logging.info(f"Received message from RabbitMQ: {body}")
            try:
                message = json.loads(body)

                process_notification_others(message)
                
                # Theoretically done in send mechanical info
                # process_notification_errors(message)
                
                send_mechanical_info(message)
                
                handle_car_turned_on(message)

            except Exception as e:
                logging.error(f"Error processing message: {e}")

        channel.basic_consume(queue='carbox', on_message_callback=callback, auto_ack=True)
        logging.info(f"Listening for messages on RabbitMQ queue: {'carbox'}")
        channel.start_consuming()

    except Exception as e:
        logging.error(f"Error in RabbitMQ consumer: {e}")


@app.post("/send-notification")
async def send_notification(notification: Notification, background_tasks: BackgroundTasks):
    """Queues a notification message in RabbitMQ."""
    try:
        message = notification.dict()

        with pika.BlockingConnection(
            pika.ConnectionParameters(host='rabbitmq', credentials=credentials)
        ) as connection:
            channel = connection.channel()
            channel.queue_declare(queue='carbox', durable=True)

            channel.basic_publish(
                exchange='',
                routing_key='carbox',
                body=json.dumps(message)
            ) 

        logging.info(f"Notification queued for car {notification.car_id}")
        return {"message": "Notification queued for processing"}

    except Exception as e:
        logging.error(f"Error queuing notification: {e}")
        raise HTTPException(status_code=500, detail=f"Error queuing notification: {e}")

@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"status": "Notification handler is running"}


threading.Thread(target=start_rabbitmq_consumer, daemon=True).start()
