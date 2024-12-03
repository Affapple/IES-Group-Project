import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Vehicle from 'Types/Vehicle';

interface VehicleCarouselProps {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onSelectVehicle: (vehicleId: string) => void;
}

const VehicleCarousel: React.FC<VehicleCarouselProps> = ({ vehicles, selectedVehicleId, onSelectVehicle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleVehicleSelect = (index: number) => {
    setActiveIndex(index);
    onSelectVehicle(vehicles[index].ecuId); // Atualiza o veículo selecionado
  };

  const handleVehicleDoubleClick = (vehicleId: string) => {
    navigate(`/carInfo/${vehicleId}`); // Navega para a página CarInfo
  };

  return (
    <div className="relative flex flex-col items-center space-y-6 py-10">
      <div className="flex items-center space-x-4 w-full max-w-3xl justify-center relative">
        {/* Botão para ir ao veículo anterior */}
        <button
          onClick={() => handleVehicleSelect((activeIndex - 1 + vehicles.length) % vehicles.length)}
          className="absolute left-0 p-2 text-gray-500 hover:text-gray-700"
        >
          <FaChevronLeft size={30} />
        </button>

        {/* Carrossel de veículos */}
        <div className="flex overflow-x-auto space-x-4 px-8">
          {vehicles.map((vehicle: Vehicle, index: number) => (
            <div
              key={vehicle.ecuId}
              onClick={() => handleVehicleSelect(index)} // Clique único para selecionar o veículo
              onDoubleClick={() => handleVehicleDoubleClick(vehicle.ecuId)} // Clique duplo para navegar
              className={`cursor-pointer transition-transform duration-300 rounded-lg border ${
                vehicle.ecuId === selectedVehicleId
                  ? 'bg-gray-500 text-white scale-125 shadow-2xl z-10'
                  : 'bg-white text-gray-800 scale-90 shadow-md opacity-75'
              } min-w-[200px] p-6 flex flex-col items-center hover:scale-105`}
            >
              <p>{vehicle.brand} {vehicle.model}</p>
              <p>{vehicle.licensePlate}</p>
            </div>
          ))}
        </div>

        {/* Botão para ir ao próximo veículo */}
        <button
          onClick={() => handleVehicleSelect((activeIndex + 1) % vehicles.length)}
          className="absolute right-0 p-2 text-gray-500 hover:text-gray-700"
        >
          <FaChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default VehicleCarousel;