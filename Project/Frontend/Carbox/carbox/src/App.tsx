import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import CarInfo from "./pages/CarInfo";
import MainPage from "./pages/HomePage";
import UserVehicles from "./pages/UserVehicles";
import AdminDashboard from "./pages/AdminDashboard";


// !for now because the email is encrypted in the token we will only verify if its admin if the username is admin and password...

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
          // No verification for now
          element={<AdminDashboard />}
        />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
