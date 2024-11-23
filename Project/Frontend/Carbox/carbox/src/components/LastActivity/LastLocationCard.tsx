import React, { useEffect, useState } from 'react';
import { getCarLatestData } from '../../apiClient';

interface LastLocationCardProps {
  vehicleId: string | null; // O ID do veículo selecionado, recebido como prop
}

interface LocationData {
  address: string;
  mapImageUrl: string;
}

const LastLocationCard: React.FC<LastLocationCardProps> = ({ vehicleId }) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) return; // Se não houver um veículo selecionado, não faz a chamada à API

    const fetchLocationData = async () => {
      try {
        const data = await getCarLatestData(vehicleId); // Chama a API com o vehicleId selecionado
        setLocationData({
          address: data.address || 'Address not available',
          mapImageUrl: data.mapImageUrl || 'https://via.placeholder.com/300', // Placeholder se não houver imagem
        });
      } catch (err) {
        console.error("Error fetching location:", err);
        setError("Failed to load location data.");
      }
    };

    fetchLocationData();
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
  if (!locationData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <p>A carregar dados...</p>
      </div>
    );
  }

  // Renderiza a última localização
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h4 className="text-lg font-semibold text-gray-700 mb-4">Last location</h4>
      <p className="text-sm text-gray-500 mb-4">{locationData.address}</p>
      <img
        src={locationData.mapImageUrl}
        alt="Vehicle Map"
        className="rounded-lg w-full h-40 object-cover shadow-sm"
      />
    </div>
  );
};

export default LastLocationCard;