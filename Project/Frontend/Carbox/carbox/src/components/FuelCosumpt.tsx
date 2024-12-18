import { useState, useEffect } from "react";
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
  const [autonomyLevel, setAutonomyLevel] = useState<number>(-1);
  const [temperatureLevel, setTemperatureLevel] = useState<number>(-1);
  const [batteryLevel, setBatteryLevel] = useState(-1);
  const maxAutonomy = carData.autonomy;

  useEffect(() => {
    if (liveData.length == 0) {
      return;
    }
    const latestLiveData: LiveData = liveData[liveData.length - 1];
    setBatteryLevel(latestLiveData.batteryCharge);
    setTemperatureLevel(latestLiveData.motorTemperature);
    setAutonomyLevel((latestLiveData.gasLevel * maxAutonomy) / 100);
  }, [liveData]);

  function checkBatteryLevel() {
    return batteryLevel >= 30;
  }
  function checkAutonomyLevel() {
    return autonomyLevel >= maxAutonomy * 0.25;
  }
  function checkTemperatureLevel() {
    return temperatureLevel <= 105;
  }

  if (liveData.length == 0) return <></>;
  else {
    return (
      <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3 flex flex-wrap justify-between items-center   ">
        <div className="flex justify-between items-center ml-10">
          <div className="">
            <p className="bigInfo">Autonomy </p>
            <p className={checkAutonomyLevel() ? "bigInfo2" : "bigInfo2Alert"}>
              {autonomyLevel} Km
            </p>
          </div>
          <div className="pt-6">
            <Gauge
              width={150}
              height={150}
              value={autonomyLevel}
              text={autonomyLevel + "/" + maxAutonomy}
              valueMax={maxAutonomy}
            />
          </div>
        </div>
        <div className="flex justify-between items-center ml-10">
          <div className="">
            <p className="bigInfo">Battery Level </p>
            <p className={checkBatteryLevel() ? "bigInfo2" : "bigInfo2Alert"}>
              {batteryLevel}%
            </p>
          </div>
          <div className="">
            <Gauge
              width={150}
              height={150}
              value={batteryLevel}
              text={batteryLevel + "%"}
              valueMax={100}
              startAngle={-90}
              endAngle={90}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mr-10">
          <div className="">
            <p className="bigInfo">Engine Temperature </p>
            <p
              className={checkTemperatureLevel() ? "bigInfo2" : "bigInfo2Alert"}
            >
              {temperatureLevel} ºCelsius
            </p>
          </div>
          <div className="pt-6 pl-10">
            <Gauge
              width={150}
              height={150}
              value={temperatureLevel}
              valueMax={150}
              text={temperatureLevel + "ºC"}
            />
          </div>
        </div>
      </div>
    );
  }
}
