import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import ImageGallery from "../components/ImageGallery";
import VehicleCarousel from "../components/VehicleCarousel";
import LastActivity from "../components/LastActivity/LastActivity";
import frameImage from "../assets/frameImage.png";
import Footer from "../components/Footer";
import { getCarName, getCars } from "apiClient";
import Vehicle from "Types/Vehicle";
import { IUserContext, UserContext } from "Context/UserContext";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");
  const [names, setNames] = useState<Array<string>>([]);
  const { setCurrentUser } = useContext<IUserContext>(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCars()
      .then((response: Array<Vehicle>) => {
        setVehicles(response);

        console.log(vehicles);
        for (let i = 0; i < response.length; i++) {
          getCarName(response[i].ecuId).then((response: string) => {
            setNames((prev) => [...prev, response]);
          });
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 403) {
          setCurrentUser({ role: "" });
          navigate("/");
        }
      });
  }, []);

  const images = [frameImage];

  // Renderiza um indicador de carregamento enquanto os veículos estão a ser carregados
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ImageGallery images={images} />
      <h2 className="text-2xl font-semibold mb-6 px-8">My vehicles</h2>
      <VehicleCarousel
        vehicles={vehicles}
        selectedVehicleId={selectedVehicleId}
        onSelectVehicle={setSelectedVehicleId}
        names={names}
      />
      {/* Passa o vehicleId selecionado para os componentes de atividade */}
      <LastActivity vehicleId={selectedVehicleId} />
      <Footer />
    </div>
  );
};

export default HomePage;
