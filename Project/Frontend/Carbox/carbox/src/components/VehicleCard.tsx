import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
interface VehicleCardProps {
  name: string;
  autonomy: string;
  battery: string;
  live: boolean;
  onRemove: () => void; // Adiciona a prop para remover
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicleId, name, autonomy, battery, live, onRemove }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  const handleClick = (vehicleId: string) => {
    navigate(`/carInfo/${vehicleId}`); // Navega para a página CarInfo
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4 relative w-[260px]">
      {/* Map Section */}
      <div className="relative">
        <img
          src="myVehicle"
          alt="Map"
          className="w-full h-32 object-cover rounded-t-lg"
        />
        {live && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            LIVE
          </span>
        )}
      </div>

      {/* Name and Menu */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={toggleMenu}
        >
          <FaEllipsisV />
        </button>
        {isMenuOpen && (
          <div className="absolute top-10 right-4 bg-white border shadow-lg rounded-md z-10">
            <button
              className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
              onClick={onRemove} // Chama a função passada como prop
            >
              Remove Vehicle
            </button>
          </div>
        )}
      </div>

      {/* Separator Line */}
      <div className="border-t border-gray-300 my-2"></div>

      {/* Autonomy and Battery */}
      <div className="flex justify-between">
        <p className="text-gray-600 font-dm-sans">Autonomy:</p>
        <span className="font-bold text-black">{autonomy.split(' ')[0]} km</span>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-600 font-dm-sans">Battery:</p>
        <span
          className={`ml-1 ${
            battery >=60
              ? 'text-green-500'
              : battery <60 && battery>=30
              ? 'text-yellow-500'
              : 'text-red-500'
          } font-poppins font-semibold`}
        >
          {battery}
        </span>
      </div>

      {/* More Info Button */}
      <button className="mt-auto bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 font-dm-sans" onClick={() => handleClick(vehicleId)}>
        More info →
      </button>
    </div>
  );
};

export default VehicleCard;