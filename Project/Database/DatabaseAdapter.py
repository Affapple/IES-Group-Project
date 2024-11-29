from pymongo import MongoClient
from datetime import datetime
import logging

def connect(url, username, password):
    logging.info("Connecting to database...")
    mongo_client = MongoClient(url, username=username, password=password)
    logging.info("Connected to database!")
    return mongo_client

def check_collections(client):
    db = client["carbox"]
    for col in db.list_collection_names():
        logging.info(f"Collection: {col}")

    if "Users" not in db.list_collection_names():
        db.create_collection("Users")
    if "Cars" not in db.list_collection_names():
        db.create_collection("Cars")
    if "CarLiveInfo" not in db.list_collection_names():
        db.create_collection("CarLiveInfo")
    if "TripInfos" not in db.list_collection_names():
        db.create_collection("TripInfos")

def check_for_errors(live_data):
    if live_data["errors"]!=[]:
        logging.error(f"Error: {live_data['errors']}")
        return True
    
def insert_car_data(db, data):
    db["Cars"].insert_one(data)
    logging.info("Car data inserted successfully!")

def insert_car_live_data(db, data):
    db["CarLiveInfo"].insert_one(data)
    logging.info("Car live data inserted successfully!")

def insert_trip_data(db, data):
    db["TripInfos"].insert_one(data)
    logging.info("Trip data inserted successfully!")

#Checks last live data of car and sees if its a new trip or the end of one
def check_trip(db, live_data):
    #Get last trip of car and sort by trip number
    last_trip = db["TripInfos"].find({"car_id":live_data["car_id"]}).sort("trip_id", -1).limit(1)
    if last_trip.count()==0:
        if live_data["car_status"]:
            #Its the first trip ever
            live_data["trip_id"]=1
            create_trip(db, live_data, 1)
            return live_data
    else:
        last_trip = last_trip[0]
        #If trip has not ended yet
        if last_trip["trip_end"]==None:
            if live_data["car_status"]:
                live_data["trip_id"]=last_trip["trip_id"]
                return live_data
            else:
                last_trip["trip_end"]=live_data["timestamp"]
                live_data["trip_id"]=last_trip["trip_id"]
                #Get all the speeds, rpm, motortemp and torque of trip
                trip_data = db["CarLiveInfo"].find({"car_id":live_data["car_id"], "trip_id":last_trip["trip_id"]}).sort("timestamp", 1)
                speeds = []
                rpm = []
                motortemp = []
                torque = []
                for data in trip_data:
                    speeds.append(data["speed"])
                    rpm.append(data["rpm"])
                    motortemp.append(data["motor_temperature"])
                    torque.append(data["torque"])
                last_trip["trip_speeds"]=speeds
                last_trip["trip_rpm"]=rpm
                last_trip["trip_motor_temp"]=motortemp
                last_trip["trip_torque"]=torque
                db["TripInfos"].update_one({"car_id":live_data["car_id"], "trip_id":last_trip["trip_id"]}, {"$set":last_trip})
                return live_data
        else:
            live_data["trip_id"]=last_trip["trip_id"]+1
            create_trip(db, live_data, last_trip["trip_id"]+1)
            return live_data

def create_trip(db, live_data, num):
    trip={"car_id":live_data["car_id"], "trip_id":num, "trip_start":live_data["timestamp"], "trip_end":None}
    insert_trip_data(db, trip)
    return trip
    
    
#TODO: Implement this function to send alerts to the notification handler
def notify_user(live_data):
    pass

#TODO Implement this function to read messages from the queue
def readQueue():
    return "Not reading messages yet, but program working"


#Main program
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logging.info("Starting Database Adapter...")
    db=connect("mongodb://db:27017/", "carbox", "mySecretPassword")
    check_collections(db)

    #TODO Wait for messages and update the database
    while True:
        live_data=readQueue()
        logging.info(f"Data received: {live_data}")
        continue
        if check_for_errors(live_data):
            notify_user(live_data)
        else:
            live_data=check_trip(db, live_data)
            insert_car_live_data(db, live_data)


    
        

