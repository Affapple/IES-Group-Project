import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { MapContainer, TileLayer } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'
import {useState} from 'react';
import { getAddressFromCoordinates } from 'geoClient';

interface Location {
    latitude: number;
    longitude: number;
    address: string;
  }


export default function CarLocation({data}) {

    const [locationData, setLocationData] = useState<Location | null>(null);
    
    
    useEffect(() => {
        if (!data) return;

        const fetchLocationData = async () => {
            try {
                const [latitude, longitude] = data.location.split(',').map((value) => parseFloat(value.trim()));
                console.log('Parsed latitude and longitude:', { latitude, longitude });
        
                // Buscar o endereço real com geocodificação inversa
                const address = await getAddressFromCoordinates(latitude, longitude);
                console.log('Address fetched from coordinates:', address);
        
                setLocationData({
                  latitude,
                  longitude,
                  address,
                });
              } catch (err) {
                console.error('Error fetching location:', err);
              }
        };

        fetchLocationData();
    }   , [data]);

    if (!locationData) {
        return (
          <div className="bg-white p-6 rounded-lg shadow-md w-full mb-10">
            <p>Loading location data...</p>
          </div>
        );
      }

    const mapUrl = `https://static-maps.yandex.ru/1.x/?ll=${locationData.longitude},${locationData.latitude}&z=13&size=600,300&l=map&pt=${locationData.longitude},${locationData.latitude},pm2rdm`;

    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3  ">
            <div>
                <h1 className='text-3xl ml-10'>Last Location</h1>
                <p className="text-base text-gray-500 mb-4">{locationData.address}</p>
                <img
                    src={mapUrl}
                    alt="Vehicle Location"
                    className="rounded-lg shadow w-full h-40 object-cover"
                />
            </div>
        </div>
    
    );
    
};
