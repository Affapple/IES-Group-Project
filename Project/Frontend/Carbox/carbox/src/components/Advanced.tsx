import { useEffect, useState } from "react";
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
  const [tiresPressure, setTiresPressure] = useState<number[]>([]);
  const [oilLevel, setOilLevel] = useState<number>(-1);
  const tireName = ["Front Left", "Front Right", "Back Left", "Back Right"];

  useEffect(() => {
    if (liveData.length == 0) return;
    const latestLiveData = liveData[liveData.length - 1];
    setOilLevel(latestLiveData.oilLevel);
    setTiresPressure(latestLiveData.tirePressure);
  }, [liveData]);

  function checkOilLevel() {
    return oilLevel >= 5;
  }
  function checkTirePressure(tirePressure: number) {
    return tirePressure > 20;
  }

  return (
    <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3 flex flex-wrap  justify-between items-center   ">
      <div className="flex justify-between items-center ml-10">
        <div className="">
          <p className="bigInfo">Tire Pressure (PSI) </p>
          {tiresPressure.length > 0 ? (
            tiresPressure.map((pressure, index) => (
              <span
                key={`${index}_${Date.now()}`}
                className={
                  checkTirePressure(pressure) ? "bigInfo2" : "bigInfo2Alert"
                }
              >
                {tireName[index]}: {pressure}
              </span>
            ))
          ) : (
            <span className="bigInfo2Alert">No data!</span>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center ml-10 mr-10">
        <div className="">
          <p className="bigInfo">Oil Level </p>
          <span className={checkOilLevel() ? "bigInfo2" : "bigInfo2Alert"}>
            {oilLevel >= 0 ? oilLevel + " L" : "No Data!"}
          </span>
        </div>
        <div className="pt-6">
          {oilLevel >= 0 ? (
            <Gauge
              width={150}
              height={150}
              value={oilLevel}
              text={oilLevel + "/120"}
              valueMax={120}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
