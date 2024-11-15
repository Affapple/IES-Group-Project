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
            "Email": "user1@example.com",
            "Password": "password123",
            "Name": "User One",
            "Phone": 1234567890,
            "Admin": False,
            "CarsList": [("Car1", "User1's Car"), ("Car2", "User1's Second Car")]
        },
        {
            "Email": "user2@example.com",
            "Password": "password123",
            "Name": "User Two",
            "Phone": 9876543210,
            "Admin": False,
            "CarsList": [("Car3", "User2's Car")]
        },
        {
            "Email": "admin@example.com",
            "Password": "adminpassword",
            "Name": "Admin User",
            "Phone": 5555555555,
            "Admin": True,
            "CarsList": []  # No cars associated
        }
    ]

    # Car_Info data
    cars_info = [
        {
            "ECU_ID": "Car1",
            "Last_Revision": datetime(2023, 1, 10),
            "Brand": "Toyota",
            "L_Plate": "ABC123",
            "Model": "Corolla",
            "Year": 2020,
            "Tires": "All-Season",
            "Motor": "V4",
            "Tank": "50L",
            "Max_Speed": 180.0,
            "Horse_Power": 130,
            "Autonomy": 600.0
        },
        {
            "ECU_ID": "Car2",
            "Last_Revision": datetime(2023, 5, 15),
            "Brand": "Ford",
            "L_Plate": "DEF456",
            "Model": "Focus",
            "Year": 2019,
            "Tires": "Summer",
            "Motor": "V4",
            "Tank": "55L",
            "Max_Speed": 190.0,
            "Horse_Power": 140,
            "Autonomy": 650.0
        },
        {
            "ECU_ID": "Car3",
            "Last_Revision": datetime(2023, 3, 20),
            "Brand": "Honda",
            "L_Plate": "GHI789",
            "Model": "Civic",
            "Year": 2021,
            "Tires": "All-Season",
            "Motor": "V6",
            "Tank": "60L",
            "Max_Speed": 200.0,
            "Horse_Power": 150,
            "Autonomy": 700.0
        }
    ]

    # Trip_Info data
    trip_info = [
        {
            "Trip_ID": "Trip1",
            "Car_ID": "Car1",
            "Trip_Start": datetime(2024, 11, 1, 8, 0),
            "Trip_End": datetime(2024, 11, 1, 10, 30),
            "Trip_Speeds": [random.uniform(40, 120) for _ in range(10)],
            "Trip_RPM": [random.randint(1000, 4000) for _ in range(10)],
            "Trip_MotorTemp": [random.uniform(70, 90) for _ in range(10)],
            "Trip_Torque": [random.uniform(100, 200) for _ in range(10)]
        },
        {
            "Trip_ID": "Trip2",
            "Car_ID": "Car1",
            "Trip_Start": datetime(2024, 11, 5, 14, 0),
            "Trip_End": datetime(2024, 11, 5, 16, 0),
            "Trip_Speeds": [random.uniform(50, 130) for _ in range(10)],
            "Trip_RPM": [random.randint(1500, 4500) for _ in range(10)],
            "Trip_MotorTemp": [random.uniform(75, 95) for _ in range(10)],
            "Trip_Torque": [random.uniform(110, 210) for _ in range(10)]
        },
        {
            "Trip_ID": "Trip3",
            "Car_ID": "Car2",
            "Trip_Start": datetime(2024, 11, 3, 9, 30),
            "Trip_End": datetime(2024, 11, 3, 12, 0),
            "Trip_Speeds": [random.uniform(30, 100) for _ in range(10)],
            "Trip_RPM": [random.randint(1200, 3800) for _ in range(10)],
            "Trip_MotorTemp": [random.uniform(72, 85) for _ in range(10)],
            "Trip_Torque": [random.uniform(90, 180) for _ in range(10)]
        },
        {
            "Trip_ID": "Trip4",
            "Car_ID": "Car3",
            "Trip_Start": datetime(2024, 11, 6, 11, 0),
            "Trip_End": datetime(2024, 11, 6, 12, 45),
            "Trip_Speeds": [random.uniform(60, 140) for _ in range(10)],
            "Trip_RPM": [random.randint(1600, 4200) for _ in range(10)],
            "Trip_MotorTemp": [random.uniform(78, 92) for _ in range(10)],
            "Trip_Torque": [random.uniform(115, 220) for _ in range(10)]
        }
    ]

    # Car_Live_Info data
    car_live_info = [
        {
            "Car_ID": "Car1",
            "TimeStamp": datetime.now(),
            "Trip_ID": "Trip1",
            "Oil_Level": 80.0,
            "Battery_Charge": 90.0,
            "Car_Status": True,
            "Speed": 100.0,
            "Rotations_PM": 3000,
            "Gas_Level": 60.0,
            "Location": "37.7749° N, 122.4194° W",
            "Motor_Temperature": 85.0,
            "ABS": True,
            "Torque": 150.0,
            "Tire_Pressure": [32.0, 32.0, 32.0, 32.0],
            "Errors": []
        },
        {
            "Car_ID": "Car1",
            "TimeStamp": datetime.now() - timedelta(minutes=10),
            "Trip_ID": "Trip1",
            "Oil_Level": 78.0,
            "Battery_Charge": 88.0,
            "Car_Status": True,
            "Speed": 95.0,
            "Rotations_PM": 2800,
            "Gas_Level": 55.0,
            "Location": "37.7750° N, 122.4195° W",
            "Motor_Temperature": 84.0,
            "ABS": True,
            "Torque": 145.0,
            "Tire_Pressure": [32.0, 32.0, 31.0, 32.0],
            "Errors": []
        },
        # Additional 6 Car_Live_Info entries
        {
            "Car_ID": "Car2",
            "TimeStamp": datetime.now(),
            "Trip_ID": "Trip3",
            "Oil_Level": 70.0,
            "Battery_Charge": 85.0,
            "Car_Status": True,
            "Speed": 80.0,
            "Rotations_PM": 2500,
            "Gas_Level": 50.0,
            "Location": "40.7128° N, 74.0060° W",
            "Motor_Temperature": 82.0,
            "ABS": False,
            "Torque": 120.0,
            "Tire_Pressure": [30.0, 30.0, 30.0, 30.0],
            "Errors": []
        },
        {
            "Car_ID": "Car2",
            "TimeStamp": datetime.now() - timedelta(minutes=20),
            "Trip_ID": "Trip3",
            "Oil_Level": 68.0,
            "Battery_Charge": 82.0,
            "Car_Status": True,
            "Speed": 78.0,
            "Rotations_PM": 2400,
            "Gas_Level": 48.0,
            "Location": "40.7130° N, 74.0062° W",
            "Motor_Temperature": 80.0,
            "ABS": False,
            "Torque": 118.0,
            "Tire_Pressure": [30.0, 30.0, 29.0, 30.0],
            "Errors": []
        },
        {
            "Car_ID": "Car3",
            "TimeStamp": datetime.now(),
            "Trip_ID": "Trip4",
            "Oil_Level": 85.0,
            "Battery_Charge": 92.0,
            "Car_Status": True,
            "Speed": 105.0,
            "Rotations_PM": 3200,
            "Gas_Level": 65.0,
            "Location": "34.0522° N, 118.2437° W",
            "Motor_Temperature": 88.0,
            "ABS": True,
            "Torque": 160.0,
            "Tire_Pressure": [33.0, 33.0, 33.0, 33.0],
            "Errors": []
        },
        {
            "Car_ID": "Car3",
            "TimeStamp": datetime.now() - timedelta(minutes=15),
            "Trip_ID": "Trip4",
            "Oil_Level": 83.0,
            "Battery_Charge": 90.0,
            "Car_Status": True,
            "Speed": 100.0,
            "Rotations_PM": 3100,
            "Gas_Level": 63.0,
            "Location": "34.0525° N, 118.2439° W",
            "Motor_Temperature": 87.0,
            "ABS": True,
            "Torque": 158.0,
            "Tire_Pressure": [33.0, 32.5, 33.0, 33.0],
            "Errors": []
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
        

