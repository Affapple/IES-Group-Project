import React from 'react';
import Navbar from '../components/NavBar';
import CarDetails from '../components/CarDetails';
import '../css/CarDetails.css';
import FuelConsumpt from '../components/FuelCosumpt';
import '../apiClient';
import NameDisplay from '../components/NameDisplay';
import Battery from '../components/Battery';
import CarInfoTrips from '../components/CarInfoTrips';
import CarLocation from '../components/CarLocation';
import { Button } from '@mui/material';
import { FormControlLabel, Switch } from '@mui/material';
import Specs from '../components/Specs';
import Advanced from '../components/Advanced';
import Live from '../components/Live';

const CarInfo: React.FC = () => {

  const [carId, setId] = React.useState(0);
  const [carName, setName] = React.useState('Johns Car');
  const [isLive, setLive] = React.useState(true);

  const [liveList, setLiveList] = React.useState([
    {speed:[100,120,140,150,120,180], rpm:[2000,2500,3000,3500,4000,4500], torque:[100,120,140,150,120,180]}]);

  const [carData, setCar] = React.useState({
    brand: 'Tesla',
    model: 'Model S',
    year: '2004',
    l_plate: 'ABC-123',
    last_revision: '13-12-2020',
    autonomy: 123,
    temperature: 25,
    battery: 22, 
    name: 'Johns Car',
    tires: 'Michelin',
    engine: 'Electric',
    horses: 200,
    fuel: 'Electric',
    Capacity: 5,
    maxSpeed: 200,
    batteryType: 'Lithium',
    brakes: true,
    tiresPress: [30, 30, 30, 30],
    oil:3 
});

  const [trips, setTrips] = React.useState([
    {date: '12-12-2020', consumption: 12, distance: 123, duration: 2},
    {date: '12-12-2020', consumption: 8, distance: 123, duration: 2},
    {date: '12-12-2020', consumption: 23, distance: 223, duration: 5},
    {date: '12-12-2020', consumption: 10, distance: 123, duration: 2},
    {date: '12-12-2020', consumption: 12, distance: 123, duration: 2}
  ]);

  const [advanced, setAdvanced] = React.useState(false);


    



  return (
    <div className="min-h-screen bg-gray-50 font-sans ml-0">
      <Navbar />
      <div className='justify-between items-center p-5 bg-white '>
        <NameDisplay data={carData}/>
        <div className='Main'>
          <div className='ml-10 '>
            <FormControlLabel 
              sx={{ display: 'block' }}
              control={
                <Switch
                  defaultChecked={false}
                  onChange={() => setAdvanced(!advanced)}
                  size='medium'
                  color='warning'
                />
              }
              label="Advanced Mode"
              labelPlacement="end"
            />
          </div>
        </div>
        <div className='Main'>
          <CarDetails data={carData}/>
        </div>
        {advanced ?
          <div className='Main'>
            <Specs data={carData}/>
          </div> : null
        } 
        {isLive ?
          <div className='Main'>
            <Live LiveInfo={liveList}/>
          </div> : null
        }
        <div className='Main'>
          <FuelConsumpt data={carData}/>
        </div>
        {advanced ?
          <div className='Main'>
            <Advanced data={carData}/>
          </div> : null
        } 
        <div className='Main'>
          <CarInfoTrips data={trips}/>
        </div>
        <div className='Main'>
          <CarLocation data={carData}/>
        </div>
        

      </div>
    </div>
  );
};

export default CarInfo;