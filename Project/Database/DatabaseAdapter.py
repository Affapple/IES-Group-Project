from pymongo import MongoClient
from datetime import datetime

#For an initial setup, while we don't have the components dockerized
#Use the following command to start the MongoDB server:
#mongod --dbpath /path/to/data/db


if __name__ == "__main__":
    print("Connecting to database...")
    mongo_client = MongoClient("mongodb://localhost:27017/",
                                username="carbox",
                                password="mySecretPassword")
    print("Connected to database!")

    print("Adding information...")
    db = mongo_client["carbox"]

    for col in db.list_collection_names():
        print(f"Dropping {col}")
        db.drop_collection(col)
    print(db.list_collection_names())

    if "Users" not in db.list_collection_names():
        db.create_collection("Users")

    if "Cars" not in db.list_collection_names():
        db.create_collection("Cars")

    if "CarLiveInfo" not in db.list_collection_names():
        db.create_collection("CarLiveInfo")

    if "TripInfos" not in db.list_collection_names():
        db.create_collection("TripInfos")

    # Insertion of fake temporary data for testing purposes
    # When the data generation stream is implemented, this will be removed
    user_1 = {
        "email": "johndoe@example.com",
        "password": "john_secure_123",
        "carsList": ["ECU001", "ECU002"]
    }

    db.Users.insert_one(user_1)

    user_2 = {
    "email": "janesmith@example.com",
    "password": "jane_secure_456",
    "carsList": ["ECU003"]
    }

    db.Users.insert_one(user_2)

    car_1 = {
    "ecu_id": "ECU001",
    "last_revision": datetime(2023, 5, 10),
    "brand": "Tesla",
    "license_plate": "ABC1234",
    "model": "model S",
    "year": 2021,
    "tires": "Goodyear",
    "motor": "Electric",
    "ecu_id": "ECU001",
    "last_revision": datetime(2023, 5, 10),
    "brand": "Tesla",
    "license_plate": "ABC1234",
    "model": "model S",
    "year": 2021,
    "tires": "Goodyear",
    "motor": "Electric",
    "Tank": "N/A",
    "max_speed": 250.0,
    "horsepower": 670,
    "autonomy": 560.0
    }

    db.Cars.insert_one(car_1)

    car_2 = {
    "ecu_id": "ECU002",
    "last_revision": datetime(2023, 3, 15),
    "brand": "Ford",
    "license_plate": "XYZ5678",
    "model": "Mustang",
    "year": 2018,
    "tires": "Michelin",
    "motor": "V8",
    "tank": "60L",
    "max_speed": 240.0,
    "horsepower": 450,
    "autonomy": 500.0
    "ecu_id": "ECU002",
    "last_revision": datetime(2023, 3, 15),
    "brand": "Ford",
    "license_plate": "XYZ5678",
    "model": "Mustang",
    "year": 2018,
    "tires": "Michelin",
    "motor": "V8",
    "tank": "60L",
    "max_speed": 240.0,
    "horsepower": 450,
    "autonomy": 500.0
    }

    db.Cars.insert_one(car_2)

    car_3 = {
    "ecu_id": "ECU003",
    "last_revision": datetime(2024, 1, 25),
    "brand": "Toyota",
    "license_plate": "JKL7890",
    "model": "Camry",
    "year": 2020,
    "tires": "Bridgestone",
    "motor": "Hybrid",
    "ecu_id": "ECU003",
    "last_revision": datetime(2024, 1, 25),
    "brand": "Toyota",
    "license_plate": "JKL7890",
    "model": "Camry",
    "year": 2020,
    "tires": "Bridgestone",
    "motor": "Hybrid",
    "Tank": "50L",
    "max_speed": 210.0,
    "horsepower": 300,
    "autonomy": 700.0
    "max_speed": 210.0,
    "horsepower": 300,
    "autonomy": 700.0
    }

    db.Cars.insert_one(car_3)

    trip_1 = {
    "trip_id": "TRIP001",
    "car_id": "ECU001",
    "trip_start": datetime(2023, 10, 30, 8, 0, 0),
    "trip_end": datetime(2023, 10, 30, 9, 30, 0)
    }

    db.TripInfos.insert_one(trip_1)

    trip_2 = {
    "trip_id": "TRIP002",
    "car_id": "ECU002",
    "trip_start": datetime(2023, 10, 29, 15, 0, 0),
    "trip_end": datetime(2023, 10, 29, 16, 45, 0)
    }

    db.TripInfos.insert_one(trip_2)

    trip_3 = {
    "trip_id": "TRIP003",
    "car_id": "ECU003",
    "trip_start": datetime(2023, 10, 31, 10, 0, 0),
    "trip_end": datetime(2023, 10, 31, 11, 0, 0)
    }

    db.TripInfos.insert_one(trip_3)

    live_info_1 = {
    "car_id": "ECU001",
    "timestamp": datetime(2023, 10, 30, 8, 15, 0),
    "trip_id": "TRIP001",
    "oil_level": 100.0,
    "battery_charge": 90.0,
    "car_status": True,
    "Speed": 100.0,
    "rpm": 3000,
    "gas_level": 100.0,
    "location": "34.0522° N, 118.2437° W",
    "motor_Temperature": 80.0,
    "abs": True,
    "torque": 400.0,
    "tire_pressure": 32.0,
    "errors": []
    }

    db.CarLiveInfo.insert_one(live_info_1)

    live_info_2 = {
    "car_id": "ECU001",
    "timestamp": datetime(2023, 10, 30, 9, 0, 0),
    "trip_id": "TRIP001",
    "oil_level": 100.0,
    "battery_charge": 80.0,
    "car_status": True,
    "Speed": 120.0,
    "rpm": 3200,
    "gas_level": 100.0,
    "location": "34.0722° N, 118.2537° W",
    "motor_Temperature": 85.0,
    "abs": True,
    "torque": 450.0,
    "tire_pressure": 32.5,
    "errors": []
    "rpm": 3200,
    "gas_level": 100.0,
    "location": "34.0722° N, 118.2537° W",
    "motor_Temperature": 85.0,
    "abs": True,
    "torque": 450.0,
    "tire_pressure": 32.5,
    "errors": []
    }

    db.CarLiveInfo.insert_one(live_info_2)

    live_info_3 = {
    "car_id": "ECU002",
    "timestamp": datetime(2023, 10, 29, 15, 30, 0),
    "trip_id": "TRIP002",
    "oil_level": 80.0,
    "battery_charge": 75.0,
    "car_status": True,
    "Speed": 140.0,
    "rpm": 4000,
    "gas_level": 60.0,
    "location": "34.0622° N, 118.2437° W",
    "motor_Temperature": 90.0,
    "abs": True,
    "torque": 500.0,
    "tire_pressure": [ 31.5, 31.5, 31.5, 31.5 ],
    "errors": []
    }

    db.CarLiveInfo.insert_one(live_info_3)

    live_info_4 = {
    "car_id": "ECU003",
    "timestamp": datetime(2023, 10, 31, 10, 30, 0),
    "trip_id": "TRIP003",
    "oil_level": 90.0,
    "battery_charge": 95.0,
    "car_status": True,
    "Speed": 90.0,
    "rpm": 2500,
    "gas_level": 75.0,
    "location": "34.0222° N, 118.2837° W",
    "motor_Temperature": 70.0,
    "abs": True,
    "torque": 350.0,
    "tire_pressure": [ 33.0, 33.0, 33.0, 33.0 ],
    "errors": []
    }

    db.CarLiveInfo.insert_one(live_info_4)

    live_info_5 = {
    "car_id": "ECU003",
    "timestamp": datetime(2023, 10, 31, 10, 45, 0),
    "trip_id": "TRIP003",
    "oil_level": 88.0,
    "battery_charge": 92.0,
    "car_status": True,
    "Speed": 110.0,
    "rpm": 2800,
    "gas_level": 70.0,
    "location": "34.0322° N, 118.2937° W",
    "motor_Temperature": 72.0,
    "abs": True,
    "torque": 360.0,
    "tire_pressure": [ 32.8, 32.8, 32.8, 32.8 ],
    "errors": []
    }

    db.CarLiveInfo.insert_one(live_info_5)
    print("Done!")

