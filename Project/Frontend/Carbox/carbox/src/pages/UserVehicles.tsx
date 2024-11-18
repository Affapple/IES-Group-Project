import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import VehicleCard from '../components/VehicleCard';
import Footer from '../components/Footer';
import AddVehicleModal from '../components/AddVehicleModal';
import myVehicles from '../assets/myVehicles.png';
import filter from '../assets/filter.png';

const UserVehicles: React.FC = () => {
  // Mock data para veículos
  const mockVehicles = [
    { id: '1', name: "John's Car", range: 431, battery: 'Optimal', live: true },
    { id: '2', name: "Mom's", range: 216, battery: 'Be careful', live: false },
    { id: '3', name: 'Smart', range: 352, battery: 'Change', live: false },
    { id: '4', name: "Dad's", range: 198, battery: 'Optimal', live: true },
  ];

  const [vehicles, setVehicles] = useState(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = vehicles.filter((vehicle) =>
      vehicle.name.toLowerCase().includes(query)
    );
    setFilteredVehicles(filtered);
  };

  const handleShowAllVehicles = () => {
    setFilteredVehicles(vehicles); 
    setSearchQuery(''); 
  };

  const handleAddVehicle = (newVehicle: { licensePlate: string; name: string; ecuId: string }) => {
    const updatedVehicles = [
      ...vehicles,
      { id: (vehicles.length + 1).toString(), name: newVehicle.name, range: 0, battery: 'Unknown', live: false },
    ];
    setVehicles(updatedVehicles);
    setFilteredVehicles(updatedVehicles);
  };

  const handleRemoveVehicle = (id: string) => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
    setVehicles(updatedVehicles);
    setFilteredVehicles(updatedVehicles); // Atualiza a lista filtrada também
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gray-200">
        <img src={myVehicles} alt="Hero" className="w-full h-64 object-cover" />
      </div>

      {/* Search Bar */}
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Looking for a vehicle?"
            value={searchQuery}
            onChange={handleSearch}
            className="w-1/2 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
          />
          <button className="transition-transform transform hover:scale-105">
            <img src={filter} alt="Filter Icon" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Add new vehicle */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-green-100 text-green-500 px-6 py-3 rounded-md font-medium hover:bg-green-200 transition-all duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          Add new vehicle
        </button>
      </div>

      {/* Vehicle Cards */}
      <div className="container mx-auto p-6 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6x2">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              name={vehicle.name}
              autonomy={`${vehicle.range || 0} km`}
              battery={vehicle.battery || 'Unknown'}
              live={vehicle.live || false}
              onRemove={() => handleRemoveVehicle(vehicle.id)} 
            />
          ))}
        </div>
      </div>

      {/* Show all vehicles */}
      <div className="flex justify-center mt-6">
        <button
          className="border border-gray-300 px-6 py-3 rounded-md font-medium text-gray-600 hover:text-black hover:border-black transition-all duration-200 flex items-center space-x-2"
          onClick={handleShowAllVehicles}
        >
          <span>Show all vehicles</span>
        </button>
      </div>

      {/* Modal */}
      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddVehicle={handleAddVehicle}
      />

      <Footer />
    </div>
  );
};

export default UserVehicles;