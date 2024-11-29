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
    from datetime import datetime, timedelta
    import random

    # User data
    users = [
        {
            "email": "user1@example.com",
            "password": "password123",
            "username": "User One",
            "phone": 213,
            "admin": False,
            "carsList": [["Car1", "User1's Car"], ["Car2", "User1's Second Car"]]
        },
        {
            "email": "user2@example.com",
            "password": "password123",
            "username": "User Two",
            "phone": 213,
            "admin": False,
            "carsList": [["Car3", "User2's Car"]]
        },
        {
            "email": 'admin@admin.com',
            "username": 'admin',
            "password": '$2a$10$BYPsOQzU2JuMbLg0PLs6/uVcBfzYSgPu1oMb8kGJXmQAGg6qkWlma',
            "carsList": [],
            "phone": 312321,
            "role": 'ADMIN',
            "_class": 'ies.carbox.api.RestAPI.entity.User'
        }
    ]

    # Car_Info data
    cars_info = [
        {
            "ecu_id": "Car1",
            "last_revision": datetime(2023, 1, 10),
            "brand": "Toyota",
            "license_plate": "ABC123",
            "model": "Corolla",
            "year": 2020,
            "tires": "All-Season",
            "motor": "V4",
            "tank": "50L",
            "max_speed": 180.0,
            "horsepower": 130,
            "autonomy": 600.0
        },
        {
            "ecu_id": "Car2",
            "last_revision": datetime(2023, 5, 15),
            "brand": "Ford",
            "license_plate": "DEF456",
            "model": "Focus",
            "year": 2019,
            "tires": "Summer",
            "motor": "V4",
            "tank": "55L",
            "max_speed": 190.0,
            "horsepower": 140,
            "autonomy": 650.0
        },
        {
            "ecu_id": "Car3",
            "last_revision": datetime(2023, 3, 20),
            "brand": "Honda",
            "license_plate": "GHI789",
            "model": "Civic",
            "year": 2021,
            "tires": "All-Season",
            "motor": "V6",
            "tank": "60L",
            "max_speed": 200.0,
            "horsepower": 150,
            "autonomy": 700.0
        }
    ]

    # Trip_Info data
    trip_info = [
        {
            "trip_id": "Trip1",
            "car_id": "Car1",
            "trip_start": datetime(2024, 11, 1, 8, 0),
            "trip_end": datetime(2024, 11, 1, 10, 30),
            "trip_speeds": [random.uniform(40, 120) for _ in range(10)],
            "trip_rpm": [random.randint(1000, 4000) for _ in range(10)],
            "trip_motor_temp": [random.uniform(70, 90) for _ in range(10)],
            "trip_torque": [random.uniform(100, 200) for _ in range(10)]
        },
        {
            "trip_id": "Trip2",
            "car_id": "Car1",
            "trip_start": datetime(2024, 11, 5, 14, 0),
            "trip_end": datetime(2024, 11, 5, 16, 0),
            "trip_speeds": [random.uniform(50, 130) for _ in range(10)],
            "trip_rpm": [random.randint(1500, 4500) for _ in range(10)],
            "trip_motor_temp": [random.uniform(75, 95) for _ in range(10)],
            "trip_torque": [random.uniform(110, 210) for _ in range(10)]
        },
        {
            "trip_id": "Trip3",
            "car_id": "Car2",
            "trip_start": datetime(2024, 11, 3, 9, 30),
            "trip_end": datetime(2024, 11, 3, 12, 0),
            "trip_speeds": [random.uniform(30, 100) for _ in range(10)],
            "trip_rpm": [random.randint(1200, 3800) for _ in range(10)],
            "trip_motor_temp": [random.uniform(72, 85) for _ in range(10)],
            "trip_torque": [random.uniform(90, 180) for _ in range(10)]
        },
        {
            "trip_id": "Trip4",
            "car_id": "Car3",
            "trip_start": datetime(2024, 11, 6, 11, 0),
            "trip_end": datetime(2024, 11, 6, 12, 45),
            "trip_speeds": [random.uniform(60, 140) for _ in range(10)],
            "trip_rpm": [random.randint(1600, 4200) for _ in range(10)],
            "trip_motor_temp": [random.uniform(78, 92) for _ in range(10)],
            "trip_torque": [random.uniform(115, 220) for _ in range(10)]
        }
    ]

    # Car_Live_Info data
    car_live_info = [
        {
            "car_id": "Car1",
            "timestamp": datetime.now(),
            "trip_id": "Trip1",
            "oil_level": 80.0,
            "battery_charge": 90.0,
            "car_status": True,
            "speed": 100.0,
            "rpm": 3000,
            "gas_level": 60.0,
            "location": "37.7749° N, 122.4194° W",
            "motor_temperature": 85.0,
            "abs": True,
            "torque": 150.0,
            "tire_pressure": [32.0, 32.0, 32.0, 32.0],
            "errors": []
        },
        {
            "car_id": "Car1",
            "timestamp": datetime.now() - timedelta(minutes=10),
            "trip_id": "Trip1",
            "oil_level": 78.0,
            "battery_charge": 88.0,
            "car_status": True,
            "speed": 95.0,
            "rpm": 2800,
            "gas_level": 55.0,
            "location": "37.7750° N, 122.4195° W",
            "motor_temperature": 84.0,
            "abs": True,
            "torque": 145.0,
            "tire_pressure": [32.0, 32.0, 31.0, 32.0],
            "errors": []
        },
        # Additional 6 Car_Live_Info entries
        {
            "car_id": "Car2",
            "timestamp": datetime.now(),
            "trip_id": "Trip3",
            "oil_level": 70.0,
            "battery_charge": 85.0,
            "car_status": True,
            "speed": 80.0,
            "rpm": 2500,
            "gas_level": 50.0,
            "location": "40.7128° N, 74.0060° W",
            "motor_temperature": 82.0,
            "abs": False,
            "torque": 120.0,
            "tire_pressure": [30.0, 30.0, 30.0, 30.0],
            "errors": []
        },
        {
            "car_id": "Car2",
            "timestamp": datetime.now() - timedelta(minutes=20),
            "trip_id": "Trip3",
            "oil_level": 68.0,
            "battery_charge": 82.0,
            "car_status": True,
            "speed": 78.0,
            "rpm": 2400,
            "gas_level": 48.0,
            "location": "40.7130° N, 74.0062° W",
            "motor_temperature": 80.0,
            "abs": False,
            "torque": 118.0,
            "tire_pressure": [30.0, 30.0, 29.0, 30.0],
            "errors": []
        },
        {
            "car_id": "Car3",
            "timestamp": datetime.now(),
            "trip_id": "Trip4",
            "oil_level": 85.0,
            "battery_charge": 92.0,
            "car_status": True,
            "speed": 105.0,
            "rpm": 3200,
            "gas_level": 65.0,
            "location": "34.0522° N, 118.2437° W",
            "motor_temperature": 88.0,
            "abs": True,
            "torque": 160.0,
            "tire_pressure": [33.0, 33.0, 33.0, 33.0],
            "errors": []
        },
        {
            "car_id": "Car3",
            "timestamp": datetime.now() - timedelta(minutes=15),
            "trip_id": "Trip4",
            "oil_level": 83.0,
            "battery_charge": 90.0,
            "car_status": True,
            "speed": 100.0,
            "rpm": 3100,
            "gas_level": 63.0,
            "location": "34.0525° N, 118.2439° W",
            "motor_temperature": 87.0,
            "abs": True,
            "torque": 158.0,
            "tire_pressure": [33.0, 32.5, 33.0, 33.0],
            "errors": []
        }
    ]

    for user in users:
        db["Users"].insert_one(user)
    for car in cars_info:
        db["Cars"].insert_one(car)
    for trip in trip_info:
        db["TripInfos"].insert_one(trip)
    for live_info in car_live_info:
        db["CarLiveInfo"].insert_one(live_info)
    
    print("Data added successfully!")
        

