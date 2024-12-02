
import React, { useEffect, useState } from 'react';
import { getCarLatestData } from '../../apiClient';

interface LastLocationCardProps {
  vehicleId: string | null; // O ID do veículo selecionado, recebido como prop
}

interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
}

const LastLocationCard: React.FC<LastLocationCardProps> = ({ vehicleId }) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) return; 

    const fetchLocationData = async () => {
      try {
        const data = await getCarLatestData(vehicleId); // Chama a API com o vehicleId selecionado

        if (!data.latitude || !data.longitude) {
          throw new Error('Invalid latitude or longitude');
        }

        setLocationData({
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address || 'Address not available',
        });
      } catch (err) {
        console.error('Error fetching location:', err);
        setError('Failed to load location data.');
      }
    };

    fetchLocationData();
  }, [vehicleId]); // Refaz a chamada sempre que o vehicleId mudar

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!locationData || !locationData.latitude || !locationData.longitude) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <p>Loading location data...</p>
      </div>
    );
  }

  // URL do mapa estático (usando OpenStreetMap Static Map API)
  const mapUrl = `https://static-maps.yandex.ru/1.x/?ll=${locationData.longitude},${locationData.latitude}&z=13&size=600,300&l=map&pt=${locationData.longitude},${locationData.latitude},pm2rdm`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h4 className="text-lg font-semibold text-gray-700 mb-4">Last location</h4>
      <p className="text-sm text-gray-500 mb-4">{locationData.address}</p>
      <img
        src={mapUrl}
        alt="Vehicle Location"
        className="rounded-lg shadow w-full h-40 object-cover"
      />
    </div>
  );
};

export default LastLocationCard;