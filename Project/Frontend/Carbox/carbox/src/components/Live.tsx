import "../css/CarDetails.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import LiveData from "Types/LiveData";

export default function Live({ liveData }: { liveData: LiveData[] }) {
    function reducer<T extends keyof LiveData>(array: LiveData[], parameter: T) {
        return array.reduce(
            (acc, item) => {
                acc.push(item[parameter]);
                return acc;
            },
            [] as LiveData[T][],
        );
    }

    const [time, setTime] = useState<Date[]>([]);
    const [speed, setSpeed] = useState<number[]>([]);
    const [rpm, setRpm] = useState<number[]>([]);
    const [torque, setTorque] = useState<number[]>([]);

    useEffect(() => {
        const NUM_POINTS = 50;
        console.log(liveData)
        const times=[];
        const data=[];
        for(var i=0;i<liveData.length; i++) {
            if (times.includes(liveData[i].timestamp)){
                continue;
            }
            else{
                times.push(liveData[i].timestamp);
                data.push(liveData[i]);
            }
            
        }
        
        console.log("data new:" , data);
        const time = reducer(data, "timestamp");
        const parsedTime = time.map((ts) => new Date(ts));
        setTime(parsedTime.slice(time.length - NUM_POINTS, time.length));

        const speed = reducer(data, "speed");
        setSpeed(speed.slice(speed.length - NUM_POINTS, speed.length));

        const rpm = reducer(data, "rpm");
        setRpm(rpm.slice(rpm.length - NUM_POINTS, rpm.length));

        const torque = reducer(data, "torque");
        setTorque(torque.slice(torque.length - NUM_POINTS, torque.length));
    }, [liveData]);

    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-red-400 pb-3    ">
            <h1 className="text-3xl font-bold text-red-500 ml-10">Live Data</h1>
            <div className="flex justify-between items-center ml-10">
                <LineChart
                    xAxis={[
                        {
                            data: time,
                            scaleType: "time",
                            valueFormatter: (value) => {
                                return new Intl.DateTimeFormat("pt-PT", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                }).format(new Date(value));
                            },
                            label: "time",
                        },
                    ]}
                    series={[
                        {
                            data: speed,
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
                            scaleType: "time",
                            valueFormatter: (value) => {
                                return new Intl.DateTimeFormat("pt-PT", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                }).format(new Date(value));
                            },
                            label: "time",
                        },
                    ]}
                    series={[
                        {
                            data: rpm,
                            color: "#ff4500",
                            label: "RPM Meter",
                        },
                    ]}
                    width={500}
                    height={300}
                />
                <LineChart
                    xAxis={[
                        {
                            data: time,
                            scaleType: "time",
                            valueFormatter: (value) => {
                                return new Intl.DateTimeFormat("pt-PT", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                }).format(new Date(value));
                            },
                            label: "time",
                        },
                    ]}
                    series={[
                        {
                            data: torque,
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
