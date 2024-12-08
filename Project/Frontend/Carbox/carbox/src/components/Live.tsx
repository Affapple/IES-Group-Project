import "../css/CarDetails.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import LiveData from "Types/LiveData";

export default function Live({ listLiveData }: { listLiveData: LiveData[] }) {
  const [time, setTime] = useState<Date[]>([]);

  function reducer<T extends keyof LiveData>(array: LiveData[], parameter: T) {
    return array.reduce((acc: any[], item: LiveData) => {
      acc.push(item[parameter]);
      return acc;
    }, []);
  }

  useEffect(() => {
    setTime(reducer(listLiveData, "timestamp"));
  }, [listLiveData]);

  return (
    <div className="font-sans space-y-0.5 w-100%; border-b-2 border-red-400 pb-3    ">
      <h1 className="text-3xl font-bold text-red-500 ml-10">Live Data</h1>
      <div className="flex justify-between items-center ml-10">
        <LineChart
          xAxis={[
            {
              data: time,
            },
          ]}
          series={[
            {
              data: reducer(listLiveData, "speed"),
              area: true,
              color: "#2ca02c",
              label: "Speed Meter",
            },
          ]}
          width={500}
          height={300}
        />
        <LineChart
          xAxis={[
            {
              data: time,
            },
          ]}
          series={[
            {
              data: reducer(listLiveData, "rpm"),
              area: true,
              color: "#ff4500",
              label: "RPM Meter",
            },
          ]}
          width={500}
          height={300}
        />
        <LineChart
          xAxis={[{ data: time }]}
          series={[
            {
              data: reducer(listLiveData, "torque"),
              area: true,
              label: "Torque",
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}
