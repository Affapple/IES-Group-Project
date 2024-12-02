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


# Connect to MongoDB
# Ir buscar por variavel ambiente
client = MongoClient("mongodb://carbox:mySecretPassword@db:27017/carbox?authSource=admin")
db = client["carbox"]  # replace with your database name
users_collection = db["Users"]  # replace with your collection name

# Retrieve the email of a user based on the car ECU ID
def get_user_email_by_ecu_id(car_ecu_id: str) -> str:
    """Retrieve the user's email based on the car ECU ID."""
    try:
        # Find the user whose 'carsList' contains the car_ecu_id
        user = users_collection.find_one({"carsList": car_ecu_id})
        
        if user:
            return user.get("email")
        else:
            logging.error(f"No user found for car ECU ID: {car_ecu_id}")
            return None
    except Exception as e:
        logging.error(f"Error retrieving user email: {e}")
        return None


# Load environment variables
load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDR")
EMAIL_PASSW = os.getenv("EMAIL_PASSW")
# ! Depois mudar para variaveis ambiente
#RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "localhost")
#RABBITMQ_QUEUE = os.getenv("RABBITMQ_QUEUE", "carbox")

# Set up RabbitMQ connection and queue
credentials = pika.PlainCredentials('carbox', 'vroom')
connection=pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq', credentials=credentials))
channel=connection.channel()
channel.queue_declare(queue='carbox', durable=True)
logging.basicConfig(level=logging.INFO)


# FastAPI application instance
app = FastAPI()

# Pydantic model for Notification input validation
class Notification(BaseModel):
    car_id: str
    errors: list
    timestamp: str


# Utility function to send an email
def send_email(to_email: str, subject: str, body: str):
    """Sends an email notification."""
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(EMAIL_ADDRESS, EMAIL_PASSW)
            server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
        logging.info(f"Notification sent to {to_email}")
    except Exception as e:
        logging.error(f"Failed to send email: {e}")


# Process incoming RabbitMQ messages
def process_notification(message: dict):
    """Processes notification messages from RabbitMQ."""
    car_id = message.get("car_id")
    errors = message.get("errors")
    timestamp = message.get("timestamp")

    # Check if the 'errors' list is empty or None
    if not errors:
        logging.info(f"No errors to report for car {car_id}. Skipping email.")
        return  # Skip sending the email if no errors

    # Extract the car ECU ID (assuming it can be derived from the car_id)
    car_ecu_id = car_id  # This could be a part of the car_id or a separate field

    # Get the user's email by ECU ID
    user_email = get_user_email_by_ecu_id(car_ecu_id)
    if not user_email:
        logging.error(f"No email found for car {car_id} (ECU ID: {car_ecu_id}). Skipping email.")
        return

    # Construct the email subject and body
    subject = f"Car Alert: {car_id}"
    body = f"Errors detected in car {car_id} at {timestamp}:\n" + "\n".join(errors)

    # Send the email
    send_email(user_email, subject, body)



# RabbitMQ Consumer
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
                process_notification(message)
            except Exception as e:
                logging.error(f"Error processing message: {e}")

        channel.basic_consume(queue='carbox', on_message_callback=callback, auto_ack=True)
        logging.info(f"Listening for messages on RabbitMQ queue: {'carbox'}")
        channel.start_consuming()

    except Exception as e:
        logging.error(f"Error in RabbitMQ consumer: {e}")


# Endpoint to queue a notification
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

# Root endpoint for service health check
@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"status": "Notification handler is running"}


# Start RabbitMQ consumer in a background thread
threading.Thread(target=start_rabbitmq_consumer, daemon=True).start()
