import React from 'react';
import Navbar from '../components/NavBar';
import CarDetails from '../components/CarDetails';
import '../css/CarDetails.css';
import FuelConsumpt from '../components/FuelCosumpt';

const CarInfo: React.FC = () => {

    const info = {
        Car_name: "John",
        Ecu_ID: "1234",
        brand: "Tesla",
        model: "Model S",
        year: 2021,
        l_plate: "12-AB-34",
        last_revision: "2021-10-10",
        autonomy: 500
    }


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className='justify-between items-center p-5 bg-white '>
        <div className='Main'>
          <CarDetails car={{brand=info.brand}}/>
        </div>
        <div className='Main'>
          <FuelConsumpt autonomy={info.autonomy}/>
        </div>
        {/* Main Content */}
      </div>
    </div>
  );
};

export default CarInfo;