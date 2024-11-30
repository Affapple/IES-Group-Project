from pymongo import MongoClient
from datetime import datetime
import logging


def connect(url, username, password):
    logging.info("Connecting to database...")
    mongo_client = MongoClient(url, username=username, password=password)
    logging.info("Connected to database!")
    return mongo_client

def getDb(client, db_name):
    return client[db_name]

def checkCollections(db):
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

def checkCarExists(db, car):
    if db["Cars"].find_one({"ecu_id":car["ecu_id"]})==None:
        db["Cars"].insert_one(car)
        logging.info("Car inserted successfully!")
    else:
        logging.info("Car already exists!")


def checkForErrors(liveData):
    if liveData["errors"]!=[]:
        logging.error(f"Error: {liveData['errors']}")
        return True
    
def insertCarData(db, data):
    db["Cars"].insert_one(data)
    logging.info("Car data inserted successfully!")d

def insertCarLiveData(db, data):
    db["CarLiveInfo"].insert_one(data)
    logging.info("Car live data inserted successfully!")

def insertTripData(db, data):
    db["TripInfos"].insert_one(data)
    logging.info("Trip data inserted successfully!")

#Checks last live data of car and sees if its a new trip or the end of one
def checkTrip(db, liveData):
    #Get last trip of car and sort by trip number
    lastTrip = db["TripInfos"].find({"car_id":liveData["car_id"]}).sort("trip_id", -1).limit(1)
    if lastTrip.count()==0:
        if liveData["car_status"]:
            #Its the first trip ever
            liveData["trip_id"]=1
            createTrip(db, liveData, 1)
            return liveData
    else:
        lastTrip = lastTrip[0]
        #If trip has not ended yet
        if lastTrip["trip_end"]==None:
            if liveData["car_status"]:
                liveData["trip_id"]=lastTrip["trip_id"]
                return liveData
            else:
                lastTrip["trip_end"]=liveData["timestamp"]
                liveData["trip_id"]=lastTrip["trip_id"]
                #Get all the speeds, rpm, motortemp and torque of trip
                trip_data = db["CarLiveInfo"].find({"car_id":liveData["car_id"], "trip_id":lastTrip["trip_id"]}).sort("timestamp", 1)
                speeds = []
                rpm = []
                motorTemp = []
                torque = []
                for data in trip_data:
                    speeds.append(data["speed"])
                    rpm.append(data["rpm"])
                    motorTemp.append(data["motor_temperature"])
                    torque.append(data["torque"])
                lastTrip["trip_speeds"]=speeds
                lastTrip["trip_rpm"]=rpm
                lastTrip["trip_motor_temp"]=motorTemp
                lastTrip["trip_torque"]=torque
                db["TripInfos"].update_one({"car_id":liveData["car_id"], "trip_id":lastTrip["trip_id"]}, {"$set":lastTrip})
                return liveData
        else:
            liveData["trip_id"]=lastTrip["trip_id"]+1
            createTrip(db, liveData, lastTrip["trip_id"]+1)
            return liveData

def createTrip(db, liveData, num):
    trip={"car_id":liveData["car_id"], "trip_id":num, "trip_start":liveData["timestamp"], "trip_end":None}
    insertTripData(db, trip)
    return trip
    
    
#TODO: Implement this function to send alerts to the notification handler
def notifyUser(liveData):
    pass

#TODO Implement this function to read messages from the queue
def readQueue():
    return "Not reading messages yet, but program working"

def loadCars():
    #Given the data is simulated, the cars must be preloaded in the database
    #If we generated new cars from 0, we would need a way for people on the frontend to know their new car's ecu_id
    cars=[]
    cars.append({
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
    cars.append({
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
    cars.append({
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
    cars.append({
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
    cars.append({
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
    cars.append({
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
    cars.append({
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
    cars.append({
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
    cars.append({
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
    return cars

#Main program
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logging.info("Starting Database Adapter...")
    db=connect("mongodb://db:27017/", "carbox", "mySecretPassword")
    db=getDb(db, "carbox")
    checkCollections(db)
    cars=loadCars()
    for car in cars:
        checkCarExists(db, car)

    #TODO Wait for messages and update the database
    while True:
        continue
        liveData=readQueue()
        logging.info(f"Data received: {liveData}")
        if checkForErrors(liveData):
            notifyUser(liveData)
        else:
            liveData=checkTrip(db, liveData)
            insertCarLiveData(db, liveData)


    