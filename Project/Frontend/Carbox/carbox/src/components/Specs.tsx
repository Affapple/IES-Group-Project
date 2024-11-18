import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';


export default function  Specs({data}) {

   

    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3">
            <div className='ml-10'>
                <h2 className="text-3xl font-semibold mb-2 text-gray-800">Specs</h2>
                <p className="info">Tires: <p className='info2'> {data.tires}</p></p>
                <p className="info">Engine: <p className='info2'> {data.engine}</p></p>
                <p className="info">Horse Power: <p className='info2'> {data.horses}</p></p>
            </div>
            <div className='ml-10'>
                <p className="info">Fuel: <p className='info2'> {data.fuel}</p></p>
                <p className="info">Max Capacity: <p className='info2'> {data.Capacity}</p></p>
                <p className="info">Max speed: <p className='info2'> {data.maxSpeed}</p></p>
                <p className="info">Battery: <p className='info2'> {data.batteryType}</p></p>
                <p className="info">Brakes: {data.brakes ? <p className='info2'> Working</p> : <p className='info2'> Faulty</p> }</p>
            </div>
        </div>
    
    );
    
};

