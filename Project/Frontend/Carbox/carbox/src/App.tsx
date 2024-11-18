import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import MainPage from "./pages/MainPage";
import UserVehicles from "./pages/UserVehicles";
import AdminPage from "pages/AdminPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/main" element={<UserVehicles />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Adicionar rotas */}
      </Routes>
    </Router>
  );
};

export default App;
