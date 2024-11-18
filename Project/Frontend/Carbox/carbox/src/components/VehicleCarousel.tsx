import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Vehicle {
  id: string;
  name: string;
  license: string;
  live?: boolean;
}

interface VehicleCarouselProps {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onSelectVehicle: (vehicleId: string) => void;
}

const VehicleCarousel: React.FC<VehicleCarouselProps> = ({ vehicles, selectedVehicleId, onSelectVehicle }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleVehicleSelect = (index: number) => {
    setActiveIndex(index);
    onSelectVehicle(vehicles[index].id); // Atualiza o veículo selecionado
  };

  return (
    <div className="relative flex flex-col items-center space-y-6 py-10">
      <div className="flex items-center space-x-4 w-full max-w-3xl justify-center relative">
        <button onClick={() => handleVehicleSelect((activeIndex - 1 + vehicles.length) % vehicles.length)} className="absolute left-0 p-2 text-gray-500 hover:text-gray-700">
          <FaChevronLeft size={30} />
        </button>

        <div className="flex overflow-x-auto space-x-4 px-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              onClick={() => handleVehicleSelect(index)}
              className={`cursor-pointer transition-transform duration-300 rounded-lg border ${
                vehicle.id === selectedVehicleId
                  ? 'bg-gray-500 text-white scale-125 shadow-2xl z-10'
                  : 'bg-white text-gray-800 scale-90 shadow-md opacity-75'
              } min-w-[200px] p-6 flex flex-col items-center hover:scale-105`}
            >
              <h3>{vehicle.name}</h3>
              <p>{vehicle.license}</p>
              {vehicle.live && <span className="text-red-500 text-xs font-semibold mt-1">LIVE</span>}
            </div>
          ))}
        </div>

        <button onClick={() => handleVehicleSelect((activeIndex + 1) % vehicles.length)} className="absolute right-0 p-2 text-gray-500 hover:text-gray-700">
          <FaChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default VehicleCarousel;