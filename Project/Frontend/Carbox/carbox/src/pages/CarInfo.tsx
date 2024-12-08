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
import { getCar, getCarLatestData, getCarLiveData, getCarName, getTrips } from "apiClient";
import LiveData from "Types/LiveData";
import Trip from "Types/Trip";

const CarInfo: React.FC = (props) => {
    const navigate = useNavigate();

    const carId: string | undefined = useMatch("/carinfo/:carId")?.params.carId;

    const [isLive, setLive] = React.useState<boolean>(true);
    const [advanced, setAdvanced] = React.useState<boolean>(false);

    const [carData, setCarData] = React.useState<Vehicle>();
    const [liveList, setLiveList] = React.useState<LiveData[]>([]);
    const [CarName, setCarName] = React.useState<string>();
    const [tripList, setTripList] = React.useState([]);

    /** Fetch car data and name */
    useEffect(() => {
        if (carId) {
            getCar(carId)
                .then((response) => {
                    setCarData(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            /*Car name */
            getCarName(carId)
                .then((response) => {
                    setCarName(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            /*Trips data */
            getTrips(carId, null)
                .then((response) => {
                    console.log("Trips:", response);
                    if (response.length === 0) {
                        console.log("No trips found");
                    }
                    if (response.length > 10) {
                        setTripList(response.slice(response.length-10 , response.length));
                        console.log("Trips:", tripList);
                    }
                    else {
                        setTripList(response);
                        console.log("Trips:", tripList);
                    }
    
                })
                .catch((error) => {
                    console.log(error);
                });
            /*Last live data */
            getCarLatestData(carId)
                .then((response) => {
                    setLiveList([response]);
                    console.log("Live:", response);
                    if (response === null) {
                        setLive(false);
                    }
                    if (response.carStatus)
                        setLive(true);
                    else
                        setLive(false);
                })
                .catch((error) => {
                    console.log(error);
                });
                
        } else {
            navigate("/home");
        }
    }, []);
  
    /*
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
    }, [isLive]); */

    return (
        <div className="min-h-screen bg-gray-50 font-sans ml-0">
            <Navbar />
            <div className="justify-between items-center p-5 bg-white ">
                {carData ? (
                    <>
                        <NameDisplay data={carData} name={CarName} />
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
                            <CarLocation data={liveList} />
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
