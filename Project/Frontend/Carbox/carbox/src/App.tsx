import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import CarInfo from "./pages/CarInfo";
import MainPage from "./pages/HomePage";
import UserVehicles from "./pages/UserVehicles";
import AdminDashboard from "./pages/AdminDashboard";

const isAdmin = () => {
  const token = localStorage.getItem("token"); 
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    return payload.role === "admin"; 
  } catch (error) {
    return false;
  }
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/carinfo" element={<CarInfo />} />
        <Route path="/myvehicles" element={<UserVehicles />} />
        <Route
          path="/admin"
          element={isAdmin() ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
