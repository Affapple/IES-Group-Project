import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';


export default function FuelConsumpt({data}) {

    const [batteryLevel, setBatteryLevel] = React.useState(true);
    const battery = data.battery;
    
    function checkBatteryLevel() {
        if (battery <= 30) {
            setBatteryLevel(false);
        } else {
            setBatteryLevel(true);
        }
    };


    useEffect(() => {   
        checkBatteryLevel();
    } , [batteryLevel]);

    
    
    

    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3 flex  justify-between items-center   ">
            <div className="flex justify-between items-center ml-10">
                <div className="">
                    <p className="bigInfo">Battery Level </p>
                    {batteryLevel ? <p className="bigInfo2">{battery}%</p> : <p className="bigInfo2Alert">{battery}%</p>}
                </div>
                <div className=''>
                    <Gauge width={150} height={150} value={battery} text={battery+"%"}  valueMax={100} startAngle={-90} endAngle={90} />
                </div>
            </div>
            
        </div>
    
    );
    
};
