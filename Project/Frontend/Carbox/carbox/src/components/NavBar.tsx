import React from "react";
import { FaBell } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-green-500 font-semibold underline underline-offset-4"
      : "text-gray-600 hover:text-gray-800 transition-colors duration-300";

  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <img src="/src/assets/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-semibold text-gray-800">CarBox</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow flex justify-center space-x-6">
        <Link to="/home" className={isActive("/home")}>
          Home
        </Link>
        <Link to="/myvehicles" className={isActive("/myvehicles")}>
          My Vehicles
        </Link>
        <Link to="/faqs" className={isActive("/faqs")}>
          FAQs
        </Link>
      </nav>

      {/* User Section */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-800 font-semibold">Christian</span>
        <FaBell className="text-yellow-500 text-2xl hover:text-yellow-600 transition duration-300" />
      </div>
    </header>
  );
};

export default Navbar;