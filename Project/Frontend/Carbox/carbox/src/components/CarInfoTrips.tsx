import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';


export default function CarInfoTrips({data}) {

    const trips= data;

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    
    const tripTemplate = (trip) => {
        return (
            <div className="border-4 border-black surface-border rounded-lg m-2  py-5 px-3  ">
                <div className="">
                    <h5 className='text-3xl'>{trip.date}</h5>
                </div>
                <div className="mb-3 pl-2">
                    <p className='text-gray-400 text-lg'>consumption</p>
                    <h5 className='text-green-500 text-lg'>{trip.consumption} L</h5>
                </div>
                <div className="mb-3 pl-2" >
                    <p className='text-gray-400 text-lg'>distance</p>
                    <h5 className='t text-lg'>{trip.distance} Km</h5>
                </div>
                <div className="mb-3 pl-2">
                    <p className='text-gray-400 text-lg'>duration</p>
                    <h5 className=' text-lg'>{trip.duration} h</h5>
                </div>

            </div>
        );
    };

    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3  ">
            <div>
                <h1 className='text-3xl ml-10'>Last Trips</h1>
                <div className="ml-40 mr-40">
                    <Carousel  value={trips} numVisible={4} numScroll={4} responsiveOptions={responsiveOptions} itemTemplate={tripTemplate} />
                </div>
            </div>
        </div>
    
    );
    
};
