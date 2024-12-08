import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { getTrips } from 'apiClient';
import Trip from 'Types/Trip';

export default function CarInfoTrips({data}) {
    const trips = data;

    
    function getDuration(trip) {
        const start = new Date(trip.trip_start);
        const end = new Date(trip.trip_end);
        const diff = Math.abs(end.getTime() - start.getTime());
        const hours = Math.floor(diff / 36e5);
        return hours;
    }

    //* get date to yyyy-mm-dd and hh:mm:ss
    function getDate(date) {
        const d = new Date(date);
        return d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
    }

    

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
                    <h5 className='text-lg text-green-400'> Trip {trip.tripId}</h5>
                </div>
                <div className="">
                    <p className='text-gray-400 text-base'>Car was up from</p>
                    <h5 className='text-base'>{getDate(trip.trip_start)}</h5>
                </div>
                <div className="">
                    <p className='text-gray-400 text-base'>Till</p>
                    <h5 className='text-base'>{getDate(trip.trip_end)}</h5>
                </div>
                <div className="">
                    <p className='text-lg'>Duration: {getDuration(trip)} h</p>
                    <h5 className=' text-lg'></h5>
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
