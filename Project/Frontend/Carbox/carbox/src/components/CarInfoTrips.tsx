import React from "react";
import "../css/CarDetails.css";
import { Carousel } from "primereact/carousel";
import Trip from "Types/Trip";
import { Button } from "primereact/button";
import Modal from "./Modal";
import { LineChart } from "@mui/x-charts/LineChart";
import "../css/CarDetails.css";

export default function CarInfoTrips({ trips }: { trips: Trip[] }) {
    const [modalShown, setModalShown] = React.useState<boolean>(false);

    function getDuration(trip: Trip) {
        const start = new Date(trip.trip_start);
        const end = new Date(trip.trip_end);
        const diff = Math.abs(end.getTime() - start.getTime());
        const hours = Math.floor(diff / 36e5);
        return hours;
    }

    function toggleModal() {
        setModalShown((modalShown) => !modalShown);
    }

    //* get date to yyyy-mm-dd and hh:mm:ss
    function getDate(date: string) {
        const d = new Date(date);
        return d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0];
    }

    function getXAxis(array: number[]) {
        if (!array || !Array.isArray(array)) {
            console.error("Invalid array passed to getXAxis:", array);
            return [];
        }
        return array.map((_, index) => index);
    }

    function getAvg(array: number[]) {
        if (!array || !Array.isArray(array) || array.length === 0) {
            console.error("Invalid array passed to getAvg:", array);
            return 0;
        }
        return Math.round(array.reduce((a, b) => a + b, 0) / array.length);
    }

    const responsiveOptions = [
        {
            breakpoint: "1400px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "1199px",
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: "767px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "575px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const tripTemplate = (trip: Trip) => {
        return (
            <div className="border-4 border-black surface-border rounded-lg m-2  py-5 px-3  ">
                <div className="">
                    <h5 className="text-lg text-green-400"> Trip {trip.tripId}</h5>
                </div>
                <div className="">
                    <p className="text-gray-400 text-base">Car was up from</p>
                    <h5 className="text-base">{getDate(trip.trip_start)}</h5>
                </div>
                <div className="">
                    <p className="text-gray-400 text-base">Till</p>
                    <h5 className="text-base">{getDate(trip.trip_end)}</h5>
                </div>
                <div className="">
                    <p className="text-lg">Duration: {getDuration(trip)} h</p>
                    <h5 className=" text-lg"></h5>
                </div>
                <div className="items-end">
                    <Button
                        label="View Trip"
                        onClick={toggleModal}
                        className="p-button-raised p-button-rounded p-button-text bg-green-400 rounded-lg p-3"
                    />
                </div>
                {modalShown && trip ? (
                    <Modal onClose={toggleModal}>
                        <div className="flex-cols">
                            <button className="absolute top-2 right-2" onClick={toggleModal}>
                                Close
                            </button>
                            <h1 className="text-center">
                                <b>Trip {trip.tripId}</b>
                            </h1>
                            <div className="flex-cols">
                                <h2 className="text-left">
                                    From {getDate(trip.trip_start)} to {getDate(trip.trip_end)}
                                </h2>
                                <h2 className="text-left">
                                    Duration: {getDuration(trip)} hours
                                </h2>
                            </div>
                            {[
                                {
                                    label: "Speeds (Km/h)",
                                    data: trip.trip_speeds,
                                    color: "#2ca02c",
                                },
                                { label: "RPMs", data: trip.trip_rpm, color: "#ff4500" },
                                { label: "Torques", data: trip.trip_torque, color: "#1f77b4" },
                                {
                                    label: "Engine Temperature (ºC)",
                                    data: trip.trip_motor_temp,
                                    color: "#ff7f0e",
                                },
                            ].map(({ label, data, color }, index) => (
                                <div className="flex-cols border-b-4 border-black" key={index}>
                                    <LineChart
                                        xAxis={[{ data: getXAxis(data) }]}
                                        series={[
                                            {
                                                data: data || [],
                                                area: true,
                                                color,
                                                label: `${label}`,
                                            },
                                        ]}
                                        width={500}
                                        height={300}
                                    />
                                    <h2 className="text-left">
                                        Average {label}: {data?.length ? getAvg(data) : "N/A"}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </Modal>
                ) : null}
            </div>
        );
    };

    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3  ">
            <div>
                <h1 className="text-3xl ml-10">Last Trips</h1>
                <div className="ml-40 mr-40">
                    <Carousel
                        value={trips}
                        numVisible={4}
                        numScroll={4}
                        responsiveOptions={responsiveOptions}
                        itemTemplate={tripTemplate}
                    />
                </div>
            </div>
        </div>
    );
}
