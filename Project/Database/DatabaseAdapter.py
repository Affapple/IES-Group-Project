from pymongo import MongoClient
from datetime import datetime

#For an initial setup, while we don't have the components dockerized
#Use the following command to start the MongoDB server:
#mongod --dbpath /path/to/data/db


if __name__ == "__main__":

    mongo_client = MongoClient(f"mongodb://localhost:27017/")
    db = mongo_client["ProjectDatabase"]
    if "User" not in db.list_collection_names():
        db.create_collection("User")
    User = db["User"]
    if "Car" not in db.list_collection_names():
        db.create_collection("Car")
    Car = db["Car"]
    if "CarLive" not in db.list_collection_names():
        db.create_collection("CarLive")
    CarLive = db["CarLive"]
    if "CarTrip" not in db.list_collection_names():
        db.create_collection("CarTrip")
    CarTrip = db["CarTrip"]

    # Insertion of fake temporary data for testing purposes
    # When the data generation stream is implemented, this will be removed
    user_1 = {
    "Email": "johndoe@example.com",
    "Password": "john_secure_123",
    "CarsList": ["CAR001", "CAR002"]  
    }

    db.User.insert_one(user_1)

    user_2 = {
    "Email": "janesmith@example.com",
    "Password": "jane_secure_456",
    "CarsList": ["CAR003"]  
    }

    db.User.insert_one(user_2)

    car_1 = {
    "ECU_ID": "ECU001",
    "Last_Revision": datetime(2023, 5, 10),
    "Brand": "Tesla",
    "L_Plate": "ABC1234",
    "Model": "Model S",
    "Year": 2021,
    "Tires": "Goodyear",
    "Motor": "Electric",
    "Tank": "N/A",
    "Max_Speed": 250.0,
    "Horse_Power": 670,
    "Autonomy": 560.0 
    }

    db.Car.insert_one(car_1)

    car_2 = {
    "ECU_ID": "ECU002",
    "Last_Revision": datetime(2023, 3, 15),
    "Brand": "Ford",
    "L_Plate": "XYZ5678",
    "Model": "Mustang",
    "Year": 2018,
    "Tires": "Michelin",
    "Motor": "V8",
    "Tank": "60L",
    "Max_Speed": 240.0,
    "Horse_Power": 450,
    "Autonomy": 500.0
    }

    db.Car.insert_one(car_2)

    car_3 = {
    "ECU_ID": "ECU003",
    "Last_Revision": datetime(2024, 1, 25),
    "Brand": "Toyota",
    "L_Plate": "JKL7890",
    "Model": "Camry",
    "Year": 2020,
    "Tires": "Bridgestone",
    "Motor": "Hybrid",
    "Tank": "50L",
    "Max_Speed": 210.0,
    "Horse_Power": 300,
    "Autonomy": 700.0
    }

    db.Car.insert_one(car_3)

    trip_1 = {
    "Trip_ID": "TRIP001",
    "Car_ID": "CAR001",
    "Trip_Start": datetime(2023, 10, 30, 8, 0, 0),
    "Trip_End": datetime(2023, 10, 30, 9, 30, 0)
    }

    db.CarTrip.insert_one(trip_1)

    trip_2 = {
    "Trip_ID": "TRIP002",
    "Car_ID": "CAR002",
    "Trip_Start": datetime(2023, 10, 29, 15, 0, 0),
    "Trip_End": datetime(2023, 10, 29, 16, 45, 0)
    }

    db.CarTrip.insert_one(trip_2)

    trip_3 = {
    "Trip_ID": "TRIP003",
    "Car_ID": "CAR003",
    "Trip_Start": datetime(2023, 10, 31, 10, 0, 0),
    "Trip_End": datetime(2023, 10, 31, 11, 0, 0)
    }

    db.CarTrip.insert_one(trip_3)

    live_info_1 = {
    "Car_ID": "CAR001",
    "TimeStamp": datetime(2023, 10, 30, 8, 15, 0),
    "Trip_ID": "TRIP001",
    "Oil_Level": 100.0,
    "Battery_Charge": 90.0,
    "Car_Status": True,
    "Speed": 100.0,
    "Rotations_PM": 3000,
    "Gas_Level": 100.0,  
    "Location": "34.0522° N, 118.2437° W",
    "Motor_Temperature": 80.0,
    "ABS": True,
    "Torque": 400.0,
    "Tire_Pressure": 32.0,
    "Errors": []
    }

    db.CarLive.insert_one(live_info_1)

    live_info_2 = {
    "Car_ID": "CAR001",
    "TimeStamp": datetime(2023, 10, 30, 9, 0, 0),
    "Trip_ID": "TRIP001",
    "Oil_Level": 100.0,
    "Battery_Charge": 80.0,
    "Car_Status": True,
    "Speed": 120.0,
    "Rotations_PM": 3200,
    "Gas_Level": 100.0,
    "Location": "34.0722° N, 118.2537° W",
    "Motor_Temperature": 85.0,
    "ABS": True,
    "Torque": 450.0,
    "Tire_Pressure": 32.5,
    "Errors": []
    }

    db.CarLive.insert_one(live_info_2)

    live_info_3 = {
    "Car_ID": "CAR002",
    "TimeStamp": datetime(2023, 10, 29, 15, 30, 0),
    "Trip_ID": "TRIP002",
    "Oil_Level": 80.0,
    "Battery_Charge": 75.0,
    "Car_Status": True,
    "Speed": 140.0,
    "Rotations_PM": 4000,
    "Gas_Level": 60.0,
    "Location": "34.0622° N, 118.2437° W",
    "Motor_Temperature": 90.0,
    "ABS": True,
    "Torque": 500.0,
    "Tire_Pressure": 31.5,
    "Errors": []
    }

    db.CarLive.insert_one(live_info_3)

    live_info_4 = {
    "Car_ID": "CAR003",
    "TimeStamp": datetime(2023, 10, 31, 10, 30, 0),
    "Trip_ID": "TRIP003",
    "Oil_Level": 90.0,
    "Battery_Charge": 95.0,
    "Car_Status": True,
    "Speed": 90.0,
    "Rotations_PM": 2500,
    "Gas_Level": 75.0,
    "Location": "34.0222° N, 118.2837° W",
    "Motor_Temperature": 70.0,
    "ABS": True,
    "Torque": 350.0,
    "Tire_Pressure": 33.0,
    "Errors": []
    }

    db.CarLive.insert_one(live_info_4)

    live_info_5 = {
    "Car_ID": "CAR003",
    "TimeStamp": datetime(2023, 10, 31, 10, 45, 0),
    "Trip_ID": "TRIP003",
    "Oil_Level": 88.0,
    "Battery_Charge": 92.0,
    "Car_Status": True,
    "Speed": 110.0,
    "Rotations_PM": 2800,
    "Gas_Level": 70.0,
    "Location": "34.0322° N, 118.2937° W",
    "Motor_Temperature": 72.0,
    "ABS": True,
    "Torque": 360.0,
    "Tire_Pressure": 32.8,
    "Errors": []
    }

    db.CarLive.insert_one(live_info_5)


    










