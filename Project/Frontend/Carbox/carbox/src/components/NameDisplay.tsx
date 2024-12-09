import '../css/CarDetails.css';
import Vehicle from 'Types/Vehicle';

export default function NameDisplay({data, name}: {data: Vehicle; name: string}) {
    const l_plate = data.licensePlate;
  
    return (
        <div className="font-sans space-y-0.5 w-100%;  mb-7  items-center ">
            <h2 className="text-6xl text-center font-semibold mb-1 text-gray-800">{name} </h2>
            <h3 className="text-center">{l_plate}</h3>
        </div>
    
    );
    
};
