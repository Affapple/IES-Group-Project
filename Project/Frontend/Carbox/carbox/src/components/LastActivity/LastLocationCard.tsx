import React, { useEffect, useState } from 'react';
import { getCarLatestData } from '../../apiClient';
import LiveData from 'Types/LiveData';
import { getAddressFromCoordinates } from 'geoClient';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

function LastLocationCard({ vehicleId }: { vehicleId: string }) {
  const [locationData, setLocationData] = useState<Location | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!vehicleId) return;

    const fetchLocationData = async () => {
      try {
        const data: LiveData = await getCarLatestData(vehicleId);


        if (!data.location || !data.location.includes(',')) {
          throw new Error('Invalid or missing location data.');
        }

        const [latitude, longitude] = data.location.split(',').map((value) => parseFloat(value.trim()));

        // Buscar o endereço real com geocodificação inversa
        const address = await getAddressFromCoordinates(latitude, longitude);

        setLocationData({
          latitude,
          longitude,
          address,
        });
      } catch (err) {
        console.error('Error fetching location:', err);
        setError('Failed to load location data.');
      }
    };

    fetchLocationData();
  }, [vehicleId]);

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full mb-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!locationData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full mb-10">
        <p>Loading location data...</p>
      </div>
    );
  }

  const mapUrl = `https://static-maps.yandex.ru/1.x/?ll=${locationData.longitude},${locationData.latitude}&z=13&size=600,300&l=map&pt=${locationData.longitude},${locationData.latitude},pm2rdm`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mb-10">
      <h4 className="text-lg font-semibold text-gray-700 mb-4">Last location</h4>
      <p className="text-sm text-gray-500 mb-4">{locationData.address}</p>
      <img
        src={mapUrl}
        alt="Vehicle Location"
        className="rounded-lg shadow w-full h-40 object-cover"
      />
    </div>
  );
}

export default LastLocationCard;