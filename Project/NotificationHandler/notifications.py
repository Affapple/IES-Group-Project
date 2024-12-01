from fastapi import FastAPI, BackgroundTasks
from email.message import EmailMessage
import smtplib
import ssl
import os
from dotenv import load_dotenv
from pydantic import BaseModel

# Load environment variables
load_dotenv()

# Email address and password loaded from .env file
EMAIL_ADDRESS = os.getenv("EMAIL_ADDR")  # This should be carbox1application@gmail.com
EMAIL_PASSW = os.getenv("EMAIL_PASSW")   # This should be your Gmail app password

app = FastAPI()

# Define the data structure for the notification request
class NotificationRequest(BaseModel):
    email: str
    subject: str
    message: str

# Email sending function
def send_email(to_email: str, subject: str, body: str):
    em = EmailMessage()
    em["From"] = EMAIL_ADDRESS
    em["To"] = to_email
    em["Subject"] = subject
    em.set_content(body)

    # Establish a secure SSL context and send the email via Gmail's SMTP server
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSW)
        server.send_message(em)

# API endpoint to send a notification
@app.post("/send-notification")
async def send_notification(
    notification: NotificationRequest,  # Expecting the entire notification as a JSON body
    background_tasks: BackgroundTasks
):
    """
    Sends a notification email to the specified user.
    
    Parameters:
    - email (str): Recipient email address.
    - subject (str): Email subject.
    - message (str): Email body content.
    """
    # Send email to the user specified in the POST request
    background_tasks.add_task(send_email, notification.email, notification.subject, notification.message)
    
    # Optionally, send to admin (the same carbox1application@gmail.com) as well
    # background_tasks.add_task(send_email, EMAIL_ADDRESS, notification.subject, notification.message)

    return {"status": "Notification email queued", "recipient": notification.email}

@app.get("/")
def read_root():
    return {"Hello": "World"}
