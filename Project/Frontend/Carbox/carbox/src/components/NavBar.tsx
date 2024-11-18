import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import UserSettingsMenu from "./User/UserSettingsMenu";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleSettings = () => {
    setOpen((open) => !open);
  };

  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <img src="/src/assets/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-semibold text-gray-800" id="modal-title">CarBox</h1>
        <nav className="flex space-x-6 ml-10">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link to="/main" className="text-gray-600 hover:text-gray-800">
            My vehicles
          </Link>
          <Link to="/faqs" className="text-gray-600 hover:text-gray-800">
            FAQs
          </Link>
        </nav>
      </div>
      <div className="relative">
        <div className="flex items-center space-x-4">
          <FaBell className="text-yellow-500 text-2xl" />
          <button
            className="text-gray-800 font-semibold"
            onClick={toggleSettings}
          >
            Christian
          </button>
        </div>
        <div className="relative -bottom-1">
          <UserSettingsMenu open={open} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
