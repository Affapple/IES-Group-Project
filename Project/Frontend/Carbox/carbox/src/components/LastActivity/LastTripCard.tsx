import React, { useEffect, useState } from 'react';
import { getLastTrip } from '../../apiClient';

interface LastTripCardProps {
  vehicleId: string | null; // O ID do veículo selecionado, recebido como prop
}

interface LastTripData {
  date: string;
  duration: string;
  distance: string;
  consumption: string;
}

const LastTripCard: React.FC<LastTripCardProps> = ({ vehicleId }) => {
  const [tripData, setTripData] = useState<LastTripData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) return; // Não faz a chamada à API se nenhum veículo estiver selecionado

    const fetchTripData = async () => {
      try {
        const data = await getLastTrip(vehicleId); // Busca os dados da última viagem
        setTripData({
          date: data.date || 'Date not available',
          duration: data.duration || 'Duration not available',
          distance: data.distance || 'Distance not available',
          consumption: data.consumption || 'Consumption not available',
        });
      } catch (err) {
        console.error("Error fetching last trip:", err);
        setError("Failed to load trip data.");
      }
    };

    fetchTripData();
  }, [vehicleId]); // Refaz a chamada sempre que o vehicleId mudar

  // Mostra mensagem de erro caso algo falhe
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Mostra um loading enquanto os dados não foram carregados
  if (!tripData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <p>A carregar dados...</p>
      </div>
    );
  }

  // Renderiza os dados da última viagem
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h4 className="text-lg font-semibold text-gray-700 mb-4">Last trip</h4>
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