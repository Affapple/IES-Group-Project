import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/NavBar';
import VehicleCard from '../components/VehicleCard';
import Footer from '../components/Footer';
import AddVehicleModal from '../components/AddVehicleModal';
import myVehicles from '../assets/myVehicles.png';
import filter from '../assets/filter.png';
import { getCars, getCarLatestData, associateCar, deleteCar, getCarName } from 'apiClient.js';


const UserVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  // Carregar veículos do usuário e seus dados ao vivo
  useEffect(() => {
    
    if (hasFetched.current) return; // Prevent duplicate execution
    hasFetched.current = true;

    const fetchVehicles = async () => {
      setLoading(true);
      try {
        // Buscar os dados do utilizador (inclui a carsList)
        const userAccount = await getCars(); // getCars chama o endpoint /user/account
        console.log('User Account:', userAccount);
  
        // Processar a carsList e mapear para objetos de veículos com live data
        const vehiclesWithLiveData = await Promise.all(
          userAccount.map(async (car) => {
            const name = await getCarName(car.ecuId);
            console.log('Car Name:', name);
            // Buscar dados ao vivo para cada veículo
            const liveData = await getCarLatestData(car.ecuId);
            console.log('Live Data:', liveData);
            return {
              id: car.ecuId,
              name: name,
              range: liveData.gasLevel || 0, // Autonomia
              battery: liveData.batteryCharge || 'Unknown', // Bateria
              live: liveData.carStatus || false, // Estado ao vivo
            };
          })
        );
  
        // Atualizar o estado com os veículos processados
        setVehicles(vehiclesWithLiveData);
        setFilteredVehicles(vehiclesWithLiveData);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVehicles();
  }, []);
  
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

  const handleAddVehicle = async (newVehicle: { licensePlate: string; name: string; ecuId: string }) => {
    try {
      // Associar o novo veículo ao usuário
      await associateCar(newVehicle.ecuId, newVehicle.name);
  
      // Buscar dados ao vivo do novo veículo
      const liveData = await getCarLatestData(newVehicle.ecuId);
  
      // Atualizar o estado com o novo veículo, incluindo os dados ao vivo
      const updatedVehicles = [
        ...vehicles,
        {
          id: newVehicle.ecuId,
          name: newVehicle.name,
          range: liveData.autonomy || 0, // Garantir que autonomia seja exibida
          battery: liveData.battery || 'Unknown', // Garantir que a bateria seja exibida
          live: liveData.live || false,
        },
      ];
      setVehicles(updatedVehicles);
      setFilteredVehicles(updatedVehicles);
    } catch (error) {
      console.error('Erro ao adicionar veículo:', error);
    }
  };

  const handleRemoveVehicle = async (id: string) => {
    try {
      // Remover associação do veículo
      await deleteCar(id);

      // Atualizar o estado
      const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
      setVehicles(updatedVehicles);
      setFilteredVehicles(updatedVehicles);
    } catch (error) {
      console.error('Erro ao remover veículo:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading vehicles...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gray-200 z-0">
        <img src={myVehicles} alt="Hero" className="w-full h-64 object-cover z-0" />
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
              vehicleId={vehicle.id}
              name={vehicle.name}
              autonomy={`${vehicle.range} km`}
              battery={vehicle.battery}
              live={vehicle.live}
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