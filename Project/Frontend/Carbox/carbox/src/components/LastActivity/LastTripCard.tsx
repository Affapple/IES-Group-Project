import React, { useEffect, useState } from "react";
import { getTrips } from "../../apiClient";

interface LastTripCardProps {
  vehicleId: string; // O ID do veículo selecionado, recebido como prop
}

interface Trip {
  date: string;
  duration: string;
  distance: string;
  consumption: string;
}

const LastTripCard: React.FC<LastTripCardProps> = ({ vehicleId }) => {
  const [tripData, setTripData] = useState<Trip | null>(null); // Dados da viagem selecionada
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    if (!vehicleId) return;

    const fetchTripData = async () => {
      try {
        const trips = await getTrips(vehicleId, null); // Busca todas as viagens

        if (!trips || trips.length === 0) {
          throw new Error("No trips available.");
        }

        // Seleciona a primeira viagem da lista
        const selectedTrip = trips[0];

        // Calcula a duração
        const tripStart = new Date(selectedTrip.tripStart);
        const tripEnd = new Date(selectedTrip.tripEnd);
        const durationMs = tripEnd.getTime() - tripStart.getTime();
        const diffMs = Math.floor(durationMs / 1000);
        const duration = `${Math.round(diffMs / 60 * 100) /100} min`;

        // Calcula a distância com base nos dados de velocidades
        const speeds = selectedTrip.tripSpeeds || [];
        const distance = `${(speeds.reduce((sum, speed) => sum + speed, 0) * (durationMs / 3600000)).toFixed(2)} km`;

        // Calcula o consumo baseado na lógica (por exemplo, valores fixos ou derivados dos dados)
        const consumption = `${((speeds.length * 0.5) / (speeds.length || 1)).toFixed(2)} L/100km`;

        // Atualiza o estado com os dados da viagem
        setTripData({
          date: tripStart.toISOString().split("T")[0],
          duration: duration || "Duration not available",
          distance: distance || "Distance not available",
          consumption: consumption || "Consumption not available",
        });
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError("Failed to load trip data.");
      }
    };

    fetchTripData();
  }, [vehicleId]);

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full mb-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!tripData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full mb-10">
        <p>No trip data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mb-10 p-20">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Trip Details</h2>
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg text-gray-500">Date</p>
        <p className="text-lg font-medium text-gray-800">{tripData.date}</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg text-gray-500">Duration</p>
        <p className="text-lg font-medium text-gray-800">{tripData.duration}</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg text-gray-500">Distance</p>
        <p className="text-lg font-medium text-gray-800">{tripData.distance}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg text-gray-500">Consumption</p>
        <p className="text-lg font-medium text-green-500">
          {tripData.consumption}
        </p>
      </div>
    </div>
  );
};

export default LastTripCard;
