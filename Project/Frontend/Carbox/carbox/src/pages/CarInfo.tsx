import React, { useEffect } from "react";
import Navbar from "../components/NavBar";
import CarDetails from "../components/CarDetails";
import "../css/CarDetails.css";
import FuelConsumpt from "../components/FuelCosumpt";
import NameDisplay from "../components/NameDisplay";
import CarInfoTrips from "../components/CarInfoTrips";
import CarLocation from "../components/CarLocation";
import { FormControlLabel, Switch } from "@mui/material";
import Specs from "../components/Specs";
import Advanced from "../components/Advanced";
import Live from "../components/Live";
import { useMatch, useNavigate } from "react-router-dom";
import Vehicle from "Types/Vehicle";
import { getCar, getCarLatestData, getCarLiveData, getTrips } from "apiClient";
import LiveData from "Types/LiveData";
import Trip from "Types/Trip";

const CarInfo: React.FC = (props) => {
    const navigate = useNavigate();

    const carId: string | undefined = useMatch("/carinfo/:carId")?.params.carId;

    const [isLive, setLive] = React.useState<boolean>(true);
    const [advanced, setAdvanced] = React.useState<boolean>(false);

    const [carData, setCarData] = React.useState<Vehicle>();
    const [liveList, setLiveList] = React.useState<LiveData[]>([]);
    const [tripList, setTripList] = React.useState<Trip[]>([]);

    /** Fetch car data */
    useEffect(() => {
        if (carId) {
            getCar(carId)
                .then((response) => {
                    setCarData(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            navigate("/home");
        }
    }, []);

    /** Fetch trips */
    useEffect(() => {
        getTrips(carId, null)
            .then((response) => {
                setTripList(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [carData]);

    useEffect(() => {
        getCarLatestData(carId)
            .then((response: LiveData[]) => {
                setLiveList(response);
                setLive(response[response.length - 1].car_status);
                console.log("Fetched live data: ", response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [carData]);

    /** Fetch latest data */
    const getLatestLiveData = () => {
        const latestData = liveList[liveList.length - 1];
        getCarLiveData(carId, latestData["timestamp"].toISOString())
            .then((response: LiveData[]) => {
                setLiveList((prev) => [...prev, ...response]);

                const newLiveStatus = response[response.length - 1].car_status;
                if (newLiveStatus != isLive) setLive(newLiveStatus);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const interval = setInterval(
            () => {
                getLatestLiveData();
            },
            isLive ? 5_000 : 30_000,
        );

        return () => {
            clearInterval(interval);
        };
    }, [isLive]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans ml-0">
            <Navbar />
            <div className="justify-between items-center p-5 bg-white ">
                {carData ? (
                    <>
                        <NameDisplay data={carData} />
                        <div className="Main">
                            <div className="ml-10 ">
                                <FormControlLabel
                                    sx={{ display: "block" }}
                                    control={
                                        <Switch
                                            defaultChecked={false}
                                            onChange={() => setAdvanced(!advanced)}
                                            size="medium"
                                            color="warning"
                                        />
                                    }
                                    label="Advanced Mode"
                                    labelPlacement="end"
                                />
                            </div>
                        </div>
                        <div className="Main">
                            <CarDetails data={carData} />
                        </div>
                        {advanced ? (
                            <div className="Main">
                                <Specs
                                    liveData={liveList[liveList.length - 1]}
                                    carData={carData}
                                />
                            </div>
                        ) : null}
                        {isLive ? (
                            <div className="Main">
                                <Live LiveInfo={liveList} />
                            </div>
                        ) : null}
                        <div className="Main">
                            <FuelConsumpt data={carData} />
                        </div>
                        {advanced ? (
                            <div className="Main">
                                <Advanced
                                    liveData={liveList[liveList.length - 1]}
                                    carData={carData}
                                />
                            </div>
                        ) : null}
                        <div className="Main">
                            <CarInfoTrips data={tripList} />
                        </div>
                        <div className="Main">
                            <CarLocation data={carData} />
                        </div>
                    </>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    );
};

export default CarInfo;
