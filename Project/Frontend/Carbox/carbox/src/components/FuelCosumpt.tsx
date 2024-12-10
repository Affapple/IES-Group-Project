import React, { useEffect } from "react";
import "../css/CarDetails.css";
import { Gauge } from "@mui/x-charts/Gauge";
import Vehicle from "Types/Vehicle";
import LiveData from "Types/LiveData";

export default function FuelConsumpt({
  carData,
  liveData,
}: {
  carData: Vehicle;
  liveData: LiveData[];
}) {
  const latestLiveData: LiveData = liveData[liveData.length - 1];

  const [autonomyLevel, setAutonomyLevel] = React.useState(true);
  const [temperatureLevel, setTemperatureLevel] = React.useState(true);
  const [batteryLevel, setBatteryLevel] = React.useState(true);
  const autonomy = carData.autonomy;

  let battery = -1;
  let temperature = -1;
  if (latestLiveData != undefined) {
    battery = latestLiveData.batteryCharge;
    temperature = latestLiveData.motorTemperature;
  }

  function checkBatteryLevel() {
    setBatteryLevel(battery <= 30);
  }

  useEffect(() => {
    checkBatteryLevel();
  }, [batteryLevel]);

  function checkAutonomyLevel() {
    setAutonomyLevel(autonomy <= 50);
  }

  function checkTemperatureLevel() {
    setTemperatureLevel(temperature >= 105);
  }

  useEffect(() => {
    checkAutonomyLevel();
    checkTemperatureLevel();
  }, [autonomy, temperature]);

  return (
    <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3 flex  justify-between items-center   ">
      <div className="flex justify-between items-center ml-10">
        <div className="">
          <p className="bigInfo">Autonomy </p>
          {autonomyLevel ? (
            <p className="bigInfo2">{autonomy} Km</p>
          ) : (
            <p className="bigInfo2Alert">{autonomy} Km</p>
          )}
        </div>
        <div className="pt-6">
          <Gauge
            width={150}
            height={150}
            value={autonomy}
            text={autonomy + "/600"}
            valueMax={600}
          />
        </div>
      </div>
      <div className="flex justify-between items-center ml-10">
        <div className="">
          <p className="bigInfo">Battery Level </p>
          {batteryLevel ? (
            <p className="bigInfo2">{battery}%</p>
          ) : (
            <p className="bigInfo2Alert">{battery}%</p>
          )}
        </div>
        <div className="">
          <Gauge
            width={150}
            height={150}
            value={battery}
            text={battery + "%"}
            valueMax={100}
            startAngle={-90}
            endAngle={90}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mr-10">
        <div className="">
          <p className="bigInfo">Engine Temperature </p>
          {temperatureLevel ? (
            <p className="bigInfo2">{temperature} ºCelsius</p>
          ) : (
            <p className="bigInfo2Alert">{temperature} ºCelsius</p>
          )}
        </div>
        <div className="pt-6 pl-10">
          <Gauge
            width={150}
            height={150}
            value={temperature}
            valueMax={150}
            text={temperature + "ºC"}
          />
        </div>
      </div>
    </div>
  );
}
