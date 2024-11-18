import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const UserVehicles: React.FC = () => {

    
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src="/src/assets/logo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-semibold text-gray-800">CarBox</h1>
          <nav className="flex space-x-6 ml-10">
            <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="#" className="text-green-500 font-semibold border-b-2 border-green-500">My vehicles</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">FAQs</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-yellow-500 text-2xl">🔔</button>
          <span className="text-gray-800 font-semibold">Christian</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-12">
        {/* Banner */}
        <div className="relative bg-gray-200 h-40 rounded-lg flex items-center justify-center">
          <h2 className="absolute text-3xl font-semibold text-white">My vehicles</h2>
          <img src="/src/assets/car-banner.png" alt="Car Banner" className="object-cover w-full h-full rounded-lg opacity-80" />
        </div>

        {/* Search Bar */}
        <div className="flex items-center mt-10 mb-6">
          <div className="relative w-full max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Looking for a vehicle?"
              className="w-full pl-12 pr-10 py-2 border rounded-full text-gray-700 focus:outline-none focus:border-green-500"
            />
            <FaFilter className="absolute right-4 top-3 text-gray-400" />
          </div>
        </div>

        {/* Add New Vehicle Button */}
        <div className="flex justify-center mb-8">
          <button className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition">
            Add new vehicle
          </button>
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { name: "John's Car", autonomy: "431 km", battery: "Optimal", batteryColor: "text-green-500" },
            { name: "Mom's", autonomy: "216 km", battery: "Be careful", batteryColor: "text-yellow-500" },
            { name: "Smart", autonomy: "352 km", battery: "Change", batteryColor: "text-red-500" },
            { name: "Dad's", autonomy: "198 km", battery: "Optimal", batteryColor: "text-green-500", live: true }
          ].map((vehicle, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="relative h-32 bg-gray-300 rounded-lg mb-4">
                <img src="/src/assets/vehicle-map.png" alt="Vehicle Map" className="object-cover w-full h-full rounded-lg" />
                {vehicle.live && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">LIVE</span>}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{vehicle.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">Autonomy</p>
                <p className="text-sm font-medium text-gray-800">{vehicle.autonomy}</p>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500">Battery</p>
                <p className={`text-sm font-semibold ${vehicle.batteryColor}`}>{vehicle.battery}</p>
              </div>
              <button className="w-full bg-gray-800 text-white mt-4 py-2 rounded-md font-medium hover:bg-gray-900 transition">
                More info →
              </button>
            </div>
          ))}
        </div>

        {/* Show All Vehicles Button */}
        <div className="flex justify-center mb-12">
          <button className="px-6 py-2 border border-gray-500 text-gray-600 rounded-full font-semibold hover:bg-gray-100 transition">
            Show all vehicles
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500 border-t">
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Help Center</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default UserVehicles;