import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';


export default function FuelConsumpt({data}) {

    const [autonomyLevel, setAutonomyLevel] = React.useState(true);
    const [temperatureLevel, setTemperatureLevel] = React.useState(true);
    const autonomy = data.autonomy;
    const temperature = data.temperature;
    
    function checkAutonomyLevel() {
        if (autonomy <= 50) {
            setAutonomyLevel(false);
        } else {
            setAutonomyLevel(true);
        }
    };

    function checkTemperatureLevel() {
        if (temperature >= 105) {
            setTemperatureLevel(false);
        } else {
            setTemperatureLevel(true);
        }
    };

    useEffect(() => {   
        checkAutonomyLevel();
        checkTemperatureLevel();
    } , [autonomy, temperature]);

    
    
    

    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3 flex  justify-between items-center   ">
            <div className="flex justify-between items-center ml-10">
                <div className="">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Fuel Consumption </h2>
                    <p className="bigInfo">Autonomy </p>
                    {autonomyLevel ? <p className="bigInfo2">{autonomy} Km</p> : <p className="bigInfo2Alert">{autonomy} Km</p>}
                </div>
                <div className='pt-6'>
                    <Gauge width={150} height={150} value={autonomy}  valueMax={600}  />
                </div>
            </div>
            <div className="flex justify-between items-center mr-10">
                <div className="">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Engine</h2>
                    <p className="bigInfo">Temperature </p>
                    {temperatureLevel ? <p className="bigInfo2">{temperature} ºC</p> : <p className="bigInfo2Alert">{temperature} Km</p>}
                </div>
                <div className='pt-6 pl-10'>
                    <Gauge width={150} height={150} value={temperature} valueMax={150} />
                </div>
            </div>
            
        </div>
    
    );
    
};
