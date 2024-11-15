import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';


export default function FuelConsumpt({autonomy}) {

    //Replace this with the actual car object get from the API through the Ecu_ID
  
    //

    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Fuel Consumption</h2>
            <p className="bigInfo">Autonomy </p>
            <p className='bigInfo2'> {autonomy} Km</p>
        </div>
    
    );
    
};
