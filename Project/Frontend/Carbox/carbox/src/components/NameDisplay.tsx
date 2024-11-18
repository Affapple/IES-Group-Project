import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';
import Stack from '@mui/material/Stack';



export default function NameDisplay({data}) {

    const name= data.name;
    const l_plate = data.l_plate;
  
    


    return (
        <div className="font-sans space-y-0.5 w-100%;  mb-7  items-center ">
            <h2 className="text-6xl text-center font-semibold mb-1 text-gray-800">{name} </h2>
            <h3 className="text-center">{l_plate}</h3>
        </div>
    
    );
    
};
