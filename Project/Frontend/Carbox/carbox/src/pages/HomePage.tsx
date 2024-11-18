import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import ImageGallery from '../components/ImageGallery';
import VehicleCarousel from '../components/VehicleCarousel';
import LastActivity from '../components/LastActivity/LastActivity';
import frameImage from '../assets/frameImage.png';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Array<{ id: string; name: string; license: string; live?: boolean }>>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  // Mock temporário para dados de veículos
  useEffect(() => {
    const mockVehicles = [
      { id: '1', name: "John's Car", license: '12-AB-34', live: true },
      { id: '2', name: "Mom's Car", license: '23-GW-43' },
      { id: '3', name: "Dad's Car", license: '20-SH-35' },
      { id: '4', name: 'Smart Car', license: '94-OF-12' },
    ];
    setVehicles(mockVehicles); // Define os veículos mockados no estado
  }, []);

  const images = [frameImage];

  // Renderiza um indicador de carregamento enquanto os veículos estão a ser carregados
  if (vehicles.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading vehicles...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ImageGallery images={images} />
      <h2 className="text-2xl font-semibold mb-6 px-8">My vehicles</h2>
      <VehicleCarousel
        vehicles={vehicles}
        selectedVehicleId={selectedVehicleId}
        onSelectVehicle={setSelectedVehicleId}
      />
      {/* Passa o vehicleId selecionado para os componentes de atividade */}
      <LastActivity vehicleId={selectedVehicleId} />
      <Footer />
    </div>
  );
};

export default HomePage;