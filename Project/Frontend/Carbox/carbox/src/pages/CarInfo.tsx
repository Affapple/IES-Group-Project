import React from 'react';
import Navbar from '../components/NavBar';
import CarDetails from '../components/CarDetails';
import '../css/CarDetails.css';
import FuelConsumpt from '../components/FuelCosumpt';
import '../apiClient';

const CarInfo: React.FC = () => {

  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState('');
  const [carData, setCar] = React.useState({
    brand: 'Tesla',
    model: 'Model S',
    year: '2004',
    l_plate: 'ABC-123',
    last_revision: '13-12-2020',
    autonomy: 400
});



  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className='justify-between items-center p-5 bg-white '>
        <div className='Main'>
          <CarDetails data={carData}/>
        </div>
        <div className='Main'>
          <FuelConsumpt autonomy={carData.autonomy}/>
        </div>

      </div>
    </div>
  );
};

export default CarInfo;