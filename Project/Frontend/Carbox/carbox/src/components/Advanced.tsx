import React, { useEffect } from "react";
import "../css/CarDetails.css";
import { Gauge } from "@mui/x-charts/Gauge";
import LiveData from "Types/LiveData";
import Vehicle from "Types/Vehicle";

export default function Advanced({
  carData,
  liveData,
}: {
  carData: Vehicle;
  liveData: LiveData[];
}) {
  const latestLiveData = liveData[liveData.length - 1];
  const tires = latestLiveData ? latestLiveData.tirePressure : [-1, -1, -1, -1];
  const oil = latestLiveData ? latestLiveData.oilLevel : -1;

  const [oilLevel, setOilLevel] = React.useState(true);
  const [tirePressure, setTirePressure] = React.useState(true);

  function checkOilLevel() {
    setOilLevel(oil >= 5);
  }

  function checkTirePressure() {
    setTirePressure(tires.some((tirePressure) => tirePressure > 20));
  }

  useEffect(() => {
    checkTirePressure();
    checkOilLevel();
  }, []);

  return (
    <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3 flex  justify-between items-center   ">
      <div className="flex justify-between items-center ml-10">
        <div className="">
          <p className="bigInfo">Tire Pressure (PSI) </p>
          {tirePressure ? (
            <span className="bigInfo2">Front Left: {tires[0]}</span>
          ) : (
            <span className="bigInfo2Alert">Front Left: {tires[0]} </span>
          )}
          {tirePressure ? (
            <span className="bigInfo2">Front Right: {tires[1]}</span>
          ) : (
            <span className="bigInfo2Alert">Front Right: {tires[1]} </span>
          )}
          {tirePressure ? (
            <span className="bigInfo2">Back Left: {tires[2]}</span>
          ) : (
            <span className="bigInfo2Alert">Back Left: {tires[2]} </span>
          )}
          {tirePressure ? (
            <span className="bigInfo2">Back Right: {tires[3]}</span>
          ) : (
            <span className="bigInfo2Alert">Back Right: {tires[3]} </span>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center ml-10 mr-10">
        <div className="">
          <p className="bigInfo">Oil Level </p>
          {oilLevel ? (
            <span className="bigInfo2">{oil} L</span>
          ) : (
            <span className="bigInfo2Alert">{oil} L </span>
          )}
        </div>
        <div className="pt-6">
          <Gauge
            width={150}
            height={150}
            value={oil}
            text={oil + "/120"}
            valueMax={120}
          />
        </div>
      </div>
    </div>
  );
}
