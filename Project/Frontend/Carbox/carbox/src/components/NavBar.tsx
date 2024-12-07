import React, { useEffect } from "react";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserSettingsMenu from "./User/UserSettingsMenu";
import User from "Types/User";
import { getUser, logout } from "apiClient";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: "User",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then((response) => {
        const user = response.data;
        setUser({
          name: user.username,
          email: user.email,
          phoneNumber: user.phone,
          password: "",
        });
      })
      .catch((err) => {
        if (err.response.status == 403) {
          logout();
          navigate("/");
        }
      });
  }, []);

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-green-500 font-semibold underline underline-offset-4"
      : "text-gray-600 hover:text-gray-800 transition-colors duration-300";

  const toggleSettings = () => {
    setOpen((open) => !open);
  };
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
      <div className="relative">
        <div className="flex items-center space-x-4">
          <FaBell className="text-yellow-500 text-2xl hover:text-yellow-600 transition duration-300" />
          <button
            className="text-gray-800 font-semibold"
            onClick={toggleSettings}
          >
            {user.name}
          </button>
        </div>
        <div className="relative -bottom-1">
          {user ? <UserSettingsMenu open={open} user={user} /> : <></>}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
