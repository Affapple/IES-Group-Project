import React from 'react';
import Navbar from '../components/NavBar';
import CarDetails from '../components/CarDetails';
import '../css/CarDetails.css';

const CarInfo: React.FC = () => {

    const car = { 
        name: "John's Car",
        autonomy: "431 km",
        battery: "Optimal",
        batteryColor: "text-green-500"
    }



  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className='flex justify-between items-center p-5 bg-white '>
        <div className='Main'>
          <CarDetails />
        </div>
        {/* Main Content */}
      </div>
    </div>
  );
};

export default CarInfo;