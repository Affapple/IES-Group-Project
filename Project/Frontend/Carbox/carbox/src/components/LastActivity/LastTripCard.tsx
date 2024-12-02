import React, { useEffect, useState } from 'react';
import { getTrips } from '../../apiClient';

interface LastTripCardProps {
  vehicleId: string | null; // O ID do veículo selecionado, recebido como prop
}

interface Trip {
  date: string;
  duration: string;
  distance: string;
  consumption: string;
}

const LastTripCard: React.FC<LastTripCardProps> = ({ vehicleId }) => {
  const [tripData, setTripData] = useState<Trip | null>(null); // Dados da viagem selecionada
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) return; 

    const fetchTripData = async () => {
      try {
        const trips = await getTrips(vehicleId); // Busca todas as viagens
        console.log('Trips data from getTrips:', trips); // LOG DOS DADOS RECEBIDOS

        if (!trips || trips.length === 0) {
          throw new Error('No trips available.');
        }

        // Seleciona a primeira viagem da lista (ou qualquer outra lógica que deseje)
        const selectedTrip = trips[0];

        setTripData({
          date: selectedTrip.date || 'Date not available',
          duration: selectedTrip.duration || 'Duration not available',
          distance: selectedTrip.distance || 'Distance not available',
          consumption: selectedTrip.consumption || 'Consumption not available',
        });
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError('Failed to load trip data.');
      }
    };

    fetchTripData();
  }, [vehicleId]); // Refaz a chamada sempre que o vehicleId mudar

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!tripData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <p>No trip data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h4 className="text-lg font-semibold text-gray-700 mb-4">Trip Details</h4>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500">Date</p>
        <p className="text-sm font-medium text-gray-800">{tripData.date}</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500">Duration</p>
        <p className="text-sm font-medium text-gray-800">{tripData.duration}</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500">Distance</p>
        <p className="text-sm font-medium text-gray-800">{tripData.distance}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Consumption</p>
        <p className="text-sm font-medium text-green-500">{tripData.consumption}</p>
      </div>
    </div>
  );
};

export default LastTripCard;