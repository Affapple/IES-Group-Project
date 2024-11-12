import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';


const CarDetails: React.FC = (Ecu_ID={}) => {

    //Replace this with the actual car object get from the API through the Ecu_ID
    const car = {
        Ecu_ID: "1234",
        brand: "Tesla",
        model: "Model S",
        year: 2021,
        l_plate: "12-AB-34",
        last_revision: "2021-10-10",
    }
    //

    return (
        <div className="font-sans">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Car Information</h2>
            <p className="info">{car.brand}, {car.model}</p>
            <p className="info">Year: <p className='info2'> {car.year}</p></p>
            <p className="info">License Plate: <p className='info2'> {car.l_plate}</p></p>
            <p className="info">Last Revision: <p className='info2'> {car.last_revision}</p></p>
        </div>
    
    );
};

export default CarDetails;