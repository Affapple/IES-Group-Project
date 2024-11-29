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

def check_car_exists(db, car):
    if db["Cars"].find_one({"ecu_id":car["ecu_id"]})==None:
        db["Cars"].insert_one(car)
        logging.info("Car inserted successfully!")
    else:
        logging.info("Car already exists!")

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

def load_cars():
    #Given the data is simulated, the cars must be preloaded in the database
    #If we generated new cars from 0, we would need a way for people on the frontend to know their new car's ecu_id
    Cars=[]
    Cars.append({
        'ecu_id': '12345ABCDEF',
        'brand': 'Toyota',
        'model': 'Corolla',
        'year': 2015,
        'license_plate': 'ABC123',
        'last_revision': '2020-01-01',
        'tires': 'Michelin',
        'motor': 'DSL',
        'tank': 'petrol',
        'max_speed': 180,
        'horsepower': 120,
        'autonomy': 600,
    })
    Cars.append({
        'ecu_id': '67890FGHIJK',
        'brand': 'Honda',
        'model': 'Civic',
        'year': 2018,
        'license_plate': 'XYZ456',
        'last_revision': '2021-05-10',
        'tires': 'Bridgestone',
        'motor': 'ESS',
        'tank': 'petrol',
        'max_speed': 200,
        'horsepower': 158,
        'autonomy': 550,
    })
    Cars.append({
        'ecu_id': '24680LMNOPQ',
        'brand': 'Ford',
        'model': 'Focus',
        'year': 2017,
        'license_plate': 'LMN789',
        'last_revision': '2022-03-15',
        'tires': 'Goodyear',
        'motor': 'DSL',
        'tank': 'diesel',
        'max_speed': 190,
        'horsepower': 150,
        'autonomy': 700,
    })
    Cars.append({
        'ecu_id': '13579QRSTUV',
        'brand': 'Chevrolet',
        'model': 'Malibu',
        'year': 2016,
        'license_plate': 'JKL012',
        'last_revision': '2019-11-20',
        'tires': 'Pirelli',
        'motor': 'ESS',
        'tank': 'petrol',
        'max_speed': 210,
        'horsepower': 197,
        'autonomy': 580,
    })
    Cars.append({
        'ecu_id': '98765WXYZAB',
        'brand': 'BMW',
        'model': '3 Series',
        'year': 2020,
        'license_plate': 'DEF345',
        'last_revision': '2023-06-01',
        'tires': 'Continental',
        'motor': 'HEV',
        'tank': 'petrol',
        'max_speed': 250,
        'horsepower': 255,
        'autonomy': 520,
    })
    Cars.append({
        'ecu_id': '54321CDEFGH',
        'brand': 'Mercedes',
        'model': 'C-Class',
        'year': 2019,
        'license_plate': 'UVW678',
        'last_revision': '2022-12-15',
        'tires': 'Dunlop',
        'motor': 'HEV',
        'tank': 'diesel',
        'max_speed': 240,
        'horsepower': 194,
        'autonomy': 800,
    })
    Cars.append({
        'ecu_id': '11223IJKLMN',
        'brand': 'Audi',
        'model': 'A4',
        'year': 2021,
        'license_plate': 'GHI910',
        'last_revision': '2023-09-01',
        'tires': 'Hankook',
        'motor': 'MHEV',
        'tank': 'petrol',
        'max_speed': 240,
        'horsepower': 201,
        'autonomy': 550,
    })
    Cars.append({
        'ecu_id': '99887OPQRST',
        'brand': 'Tesla',
        'model': 'Model 3',
        'year': 2022,
        'license_plate': 'XYZ321',
        'last_revision': '2023-10-05',
        'tires': 'Michelin',
        'motor': 'Electric',
        'tank': 'electric',
        'max_speed': 261,
        'horsepower': 283,
        'autonomy': 560,
    })
    Cars.append({
        'ecu_id': '55667UVWXYZ',
        'brand': 'Volkswagen',
        'model': 'Passat',
        'year': 2014,
        'license_plate': 'QRS654',
        'last_revision': '2021-04-11',
        'tires': 'Nokian',
        'motor': 'LPG',
        'tank': 'diesel',
        'max_speed': 220,
        'horsepower': 174,
        'autonomy': 750,
    })
    return Cars

#Main program
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logging.info("Starting Database Adapter...")
    db=connect("mongodb://db:27017/", "carbox", "mySecretPassword")
    check_collections(db)
    cars=load_cars()
    for car in cars:
        check_car_exists(db, car)

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


    