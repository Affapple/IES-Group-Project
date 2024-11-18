import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';


export default function FuelConsumpt({data}) {

    const tires = data.tiresPress;
    const oil = data.oil;

    const [oilLevel, setOilLevel] = React.useState(true);
    const [tirePressure, setTirePressure] = React.useState(true);

    function checkOilLevel() {
        if (oil <= 5) {
            setOilLevel(false);
        } else {
            setOilLevel(true);
        }
    };

    function checkTirePressure() {
        for (let i = 0; i < tires.length; i++) {
            if (tires[i] < 20) {
                setTirePressure(false);
            } else {
                setTirePressure(true);
            }
        }
    }

    useEffect(() => {   
        checkTirePressure();
        checkOilLevel();
    } , [oilLevel, tirePressure]);
    

    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3 flex  justify-between items-center   ">
            <div className="flex justify-between items-center ml-10">
                <div className="">
                    <p className="bigInfo">Tire Pressure (PSI) </p>
                    {tirePressure ? <p className="bigInfo2">Front Left: {tires[0]}</p> : <p className="bigInfo2Alert">Front Left: {tires[0]} </p>}
                    {tirePressure ? <p className="bigInfo2">Front Right: {tires[1]}</p> : <p className="bigInfo2Alert">Front Right: {tires[1]} </p>}
                    {tirePressure ? <p className="bigInfo2">Back Left: {tires[2]}</p> : <p className="bigInfo2Alert">Back Left: {tires[2]} </p>}
                    {tirePressure ? <p className="bigInfo2">Back Right: {tires[3]}</p> : <p className="bigInfo2Alert">Back Right: {tires[3]} </p>}
                </div>
            </div>
            <div className="flex justify-between items-center ml-10 mr-10">
                <div className="">
                    <p className="bigInfo">Oil Level </p>
                    {oilLevel ? <p className="bigInfo2">{oil} L</p> : <p className="bigInfo2Alert">{oil} L </p>}
                </div>
                <div className='pt-6'>
                    <Gauge width={150} height={150} value={oil} text={oil+"/20"}  valueMax={20}  />
                </div>
            </div>
            
        </div>
    
    );
    
};
