import random
from datetime import datetime
import time
import logging

#Instantiate the list of inicial cars, this list is static since we need to have a base to start the simulation and
#need to know the ecu_id of each car to simulate the data and access it with users.
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

LastLiveData={
    '55667UVWXYZ':{},
    '99887OPQRST':{},
    '11223IJKLMN':{},
    '54321CDEFGH':{},
    '98765WXYZAB':{},
    '13579QRSTUV':{},
    '24680LMNOPQ':{},
    '67890FGHIJK':{},
    '12345ABCDEF':{}
}

errors=['ABS failure','Engine failure','Battery failure','Oil leak','Tire puncture','Brake failure','Coolant leak','Suspension failure','Transmission failure','Airbag failure']

logging.basicConfig(filename='DataGenerator.log', level=logging.INFO)
logging.info(Cars)

#Function to simulate the state of the car on/off
def simulateState(state):
    chance=random.randint(1,100)
    if state:
        if chance<=80:
            return True
        else:
            return False
    else:
        if chance<=70:
            return True
        else:
            return False
        
#Function to simulate errors in the car
def simulateError(ecu_id):
    if LastLiveData[ecu_id]['car_status']:
        chance=random.randint(1,100)
        if not LastLiveData[ecu_id]['abs']:
            error='ABS failure'
            LastLiveData[ecu_id]['errors'].append(error)
            logging.info(f"Error {error} simulated in car {ecu_id}")
            logging.info(f"Errors: {LastLiveData[ecu_id]['errors']}")
        if chance<=10:
            error=random.choice(errors)
            LastLiveData[ecu_id]['errors'].append(error)
            logging.info(f"Error {error} simulated in car {ecu_id}")
            logging.info(f"Errors: {LastLiveData[ecu_id]['errors']}")
        else:
            LastLiveData[ecu_id]['errors']=[]
        
#Function to simulate the variation of stats in the car
def simulateStats(ecu_id):
    change=random.randint(1,2)
    amount=random.randint(1,20)
    for car in Cars:
        if car['ecu_id']==ecu_id:
            max_speed=car['max_speed']
    if change == 1:
        LastLiveData[ecu_id]['speed']+=amount
        if LastLiveData[ecu_id]['speed']>max_speed:
            LastLiveData[ecu_id]['speed']=max_speed
        LastLiveData[ecu_id]['rpm']+=amount
        LastLiveData[ecu_id]['torque']+=amount
        LastLiveData[ecu_id]['motor_temperature']+=amount/2
    else:
        LastLiveData[ecu_id]['speed']-=amount
        if LastLiveData[ecu_id]['speed']<0:
            LastLiveData[ecu_id]['speed']=0
            LastLiveData[ecu_id]['car_status']=False
            LastLiveData[ecu_id]['rpm']=0
            LastLiveData[ecu_id]['torque']=0
            LastLiveData[ecu_id]['motor_temperature']=0
        LastLiveData[ecu_id]['rpm']-=amount
        if LastLiveData[ecu_id]['rpm']<0:
            LastLiveData[ecu_id]['rpm']=0
        LastLiveData[ecu_id]['torque']-=amount
        if LastLiveData[ecu_id]['torque']<0:
            LastLiveData[ecu_id]['torque']=0
        LastLiveData[ecu_id]['motor_temperature']-=amount/2
        if LastLiveData[ecu_id]['motor_temperature']<20:
            LastLiveData[ecu_id]['motor_temperature']=20

#Function to simulate variation of levels in the car
def simulateLevels(ecu_id):
    change=random.randint(1,2)
    amount=random.randint(1,5)
    chance=random.randint(1,100)
    if chance == 100:
        LastLiveData[ecu_id]['oil_level']=100
        LastLiveData[ecu_id]['battery_charge']=100
        LastLiveData[ecu_id]['gas_level']=100
        LastLiveData[ecu_id]['tire_pressure']=[30,30,30,30] 
        logging.info(f"Car {ecu_id} refueled")
    if chance <=50:
        if change == 1:
            LastLiveData[ecu_id]['oil_level']-=amount
            if LastLiveData[ecu_id]['oil_level']<0:
                LastLiveData[ecu_id]['oil_level']=0
                LastLiveData[ecu_id]['errors'].append('Oil leak')
                logging.info(f"Error Oil leak simulated in car {ecu_id}")
            LastLiveData[ecu_id]['battery_charge']-=amount
            if LastLiveData[ecu_id]['battery_charge']<0:
                LastLiveData[ecu_id]['battery_charge']=0
                LastLiveData[ecu_id]['errors'].append('Battery failure')
                logging.info(f"Error Battery failure simulated in car {ecu_id}")
            LastLiveData[ecu_id]['gas_level']-=amount
            if LastLiveData[ecu_id]['gas_level']<0:
                LastLiveData[ecu_id]['gas_level']=0
                LastLiveData[ecu_id]['errors'].append('Fuel leak')
                logging.info(f"Error Fuel leak simulated in car {ecu_id}")
            for i in range(4):
                LastLiveData[ecu_id]['tire_pressure'][i]-=amount
                if LastLiveData[ecu_id]['tire_pressure'][i]<0:
                    LastLiveData[ecu_id]['tire_pressure'][i]=0
                    LastLiveData[ecu_id]['errors'].append('Tire puncture')
                    logging.info(f"Error Tire puncture simulated in car {ecu_id}")
        else:
            LastLiveData[ecu_id]['oil_level']+=amount
            if LastLiveData[ecu_id]['oil_level']>100:
                LastLiveData[ecu_id]['oil_level']=100
            LastLiveData[ecu_id]['battery_charge']+=amount
            if LastLiveData[ecu_id]['battery_charge']>100:
                LastLiveData[ecu_id]['battery_charge']=100
            LastLiveData[ecu_id]['gas_level']+=amount
            if LastLiveData[ecu_id]['gas_level']>100:
                LastLiveData[ecu_id]['gas_level']=100
            for i in range(4):
                LastLiveData[ecu_id]['tire_pressure'][i]+=amount
                if LastLiveData[ecu_id]['tire_pressure'][i]>50:
                    LastLiveData[ecu_id]['tire_pressure'][i]=50

#Function to generate random data for the cars
def GenerateData(ecu_id):
    if LastLiveData[ecu_id]=={}:
        LastLiveData[ecu_id]['car_id']=ecu_id
        LastLiveData[ecu_id]['timestamp']=datetime.now().strftime("%Y-%m-%d %H:%M:%S")  
        LastLiveData[ecu_id]['car_status']=False
        LastLiveData[ecu_id]['speed']=0
        LastLiveData[ecu_id]['rpm']=0
        LastLiveData[ecu_id]['oil_level']=100
        LastLiveData[ecu_id]['battery_charge']=100
        LastLiveData[ecu_id]['gas_level']=100
        LastLiveData[ecu_id]['location']=''
        LastLiveData[ecu_id]['motor_temperature']=0
        LastLiveData[ecu_id]['tire_pressure']=[30,30,30,30]
        LastLiveData[ecu_id]['errors']=[]
        LastLiveData[ecu_id]['abs']=True
        LastLiveData[ecu_id]['torque']=0
        logging.info(f"Initial data for car {ecu_id} generated")
        logging.info(f"Data: {LastLiveData[ecu_id]}")

    else:
        LastLiveData[ecu_id]['timestamp']=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        LastLiveData[ecu_id]['car_status']=simulateState(LastLiveData[ecu_id]['car_status'])
        simulateError(ecu_id)
        simulateStats(ecu_id)
        simulateLevels(ecu_id)
        logging.info(f"Data for car {ecu_id} generated")
        logging.info(f"Data: {LastLiveData[ecu_id]}")
        print(f"Data for car {ecu_id} generated")
        print(f"Data: {LastLiveData[ecu_id]}")


#Simulate the data for the cars
while True:
    for car in Cars:
        GenerateData(car['ecu_id'])
    time.sleep(2)


