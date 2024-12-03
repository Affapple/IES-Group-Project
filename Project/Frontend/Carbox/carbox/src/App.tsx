import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import CarInfo from "./pages/CarInfo";
import MainPage from "./pages/HomePage";
import UserVehicles from "./pages/UserVehicles";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/home" element={<MainPage />}/>
        <Route path="/carinfo/:carId" element={<CarInfo />}/>
        <Route path="/myvehicles" element={<UserVehicles />} />
        {/* Outras rotas */}

      </Routes>
    </Router>
  );
};

export default App;
