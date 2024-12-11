import LiveData from "Types/LiveData";
import "../css/CarDetails.css";
import Vehicle from "Types/Vehicle";

export default function Specs({
  carData,
}: {
  carData: Vehicle;
}) {
  return (
    <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3">
      <div className="ml-10">
        <h2 className="text-3xl font-semibold mb-2 text-gray-800">Specs</h2>
        <p className="info">
          Tires:
          <span className="info2">
            {carData.tires}
          </span>
        </p>
        <p className="info">
          Engine: <span className="info2"> {carData.motor}</span>
        </p>
        <p className="info">
          Horse Power: <span className="info2"> {carData.horsepower}</span>
        </p>
      </div>
      <div className="ml-10">
        <p className="info">
          Max Autonomy: <span className="info2"> {carData.autonomy}</span>
        </p>
        <p className="info">
          Fuel Type: <span className="info2"> {carData.tank}</span>
        </p>
        <p className="info">
          Max speed: <span className="info2"> {carData.maxSpeed}</span>
        </p>
      </div>
    </div>
  );
}
