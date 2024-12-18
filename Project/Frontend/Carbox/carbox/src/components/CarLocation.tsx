import { useState, useEffect } from "react";
import "../css/CarDetails.css";
import { getAddressFromCoordinates } from "geoClient";
import Vehicle from "Types/Vehicle";
import LiveData from "Types/LiveData";

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export default function CarLocation({
  liveData,
  car,
}: {
  liveData: LiveData[];
  car: Vehicle;
}) {
  const [locationData, setLocationData] = useState<Location | undefined>(
    undefined,
  );
  const [locationAPI, setLocationAPI] = useState<string>("");
  const [lastTime, setLastTime] = useState<string>("");

  const fetchLocationData = async (data: LiveData | Vehicle) => {
    try {
      const [latitude, longitude] = data.location
        .split(",")
        .map((value) => parseFloat(value.trim()));
      // Buscar o endereço real com geocodificação inversa
      const address = await getAddressFromCoordinates(latitude, longitude);

      setLocationData({
        latitude,
        longitude,
        address,
      });
    } catch (err) {
      console.error("Error fetching location:", err);
    }
  };

  function getDate(date: string) {
    if (date == undefined) return;
    const d = new Date(date);
    return d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0];
  }

  useEffect(() => {
    if (liveData != undefined && liveData.length != 0) {
      const latestLiveData = liveData[liveData.length - 1];
      setLastTime(getDate(latestLiveData.timestamp));
      fetchLocationData(latestLiveData);
    } else if (car && car.location != null) {
      fetchLocationData(car);
    }
  }, [liveData, car]);

  useEffect(() => {
    if (locationData == undefined) return;
    setLocationAPI(
      `https://static-maps.yandex.ru/1.x/?ll=${locationData.longitude},${locationData.latitude}&z=13&size=600,300&l=map&pt=${locationData.longitude},${locationData.latitude},pm2rdm`,
    );
  }, [locationData]);

  return locationData != undefined ? (
    <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3  ">
      <div>
        <h1 className="text-3xl ml-10 mb-4">Last Location</h1>
        <p className="text-base text-gray-500 mb-4">{locationData.address}</p>
        <p className="text-base text-gray-500 mb-4">{lastTime}</p>
        <img
          src={locationAPI}
          alt="Vehicle Location"
          className="rounded-lg shadow w-full h-40 object-cover"
        />
      </div>
    </div>
  ) : (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mb-10">
      <p>Loading location data...</p>
    </div>
  );
}
