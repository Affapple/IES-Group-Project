// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/NavBar';
// import ImageGallery from '../components/ImageGallery';
// import VehicleCarousel from '../components/VehicleCarousel';
// import LastActivity from '../components/LastActivity/LastActivity';
// import frameImage from '../assets/frameImage.png';
// import Footer from '../components/Footer';
// import {getCars} from 'apiClient.js';
// import { Vehicle } from 'Types/Vehicle';

// const HomePage: React.FC = () => {
//   const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);
//   const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

//   // Mock temporário para dados de veículos
//   useEffect(() => {
//     getCars().then( (response: Array<Vehicle>) => {
//       console.log(response);
//       setVehicles(response);
//       console.log(vehicles);
//     });
//   }, []);

//   const images = [frameImage];

//   // Renderiza um indicador de carregamento enquanto os veículos estão a ser carregados
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <ImageGallery images={images} />
//       <h2 className="text-2xl font-semibold mb-6 px-8">My vehicles</h2>
//       <VehicleCarousel
        
//         vehicles={vehicles}
//         selectedVehicleId={selectedVehicleId}
//         onSelectVehicle={setSelectedVehicleId}
//       />
//       {/* Passa o vehicleId selecionado para os componentes de atividade */}
//       <LastActivity vehicleId={selectedVehicleId} />
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import ImageGallery from '../components/ImageGallery';
import VehicleCarousel from '../components/VehicleCarousel';
import LastActivity from '../components/LastActivity/LastActivity';
import frameImage from '../assets/frameImage.png';
import Footer from '../components/Footer';
import { getCars } from 'apiClient.js';
import { Vehicle } from 'Types/Vehicle';

const HomePage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getCars(); 
        console.log(response);
        setVehicles(response);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
        setError("Unable to load vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const images = [frameImage];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading vehicles...</p> {/* Add a loader if needed */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No vehicles available.</p>
      </div>
    );
  }

  // Render the main content
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
      {/* Pass the selected vehicleId to the LastActivity component */}
      <LastActivity vehicleId={selectedVehicleId} />
      <Footer />
    </div>
  );
};

export default HomePage;
