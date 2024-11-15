import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';


export default function  (car, Mechanic=false) {


    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3">
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">Car Information</h2>
            <p className="info">{car.brand}, {car.model}</p>
            <p className="info">Year: <p className='info2'> {car.year}</p></p>
            <p className="info">License Plate: <p className='info2'> {car.l_plate}</p></p>
            <p className="info">Last Revision: <p className='info2'> {car.last_revision}</p></p>
        </div>
    
    );
    
};

