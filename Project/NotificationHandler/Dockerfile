# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Upgrade pip
RUN pip install --upgrade pip

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Add the wait-for-it script to handle dependencies
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Copy the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Add environment variables for RabbitMQ and Email
ENV RABBITMQ_HOST=localhost \
    RABBITMQ_QUEUE=carbox \
    EMAIL_PASSW=wsdvpprfntxesdin \
    EMAIL_ADDR=carbox1application@gmail.com

# Command to run the application
CMD ["sh", "-c", "until wait-for-it rabbitmq:5672 --timeout=60; do sleep 5; done; uvicorn notifications_handler:app --host 0.0.0.0 --port 8000"]