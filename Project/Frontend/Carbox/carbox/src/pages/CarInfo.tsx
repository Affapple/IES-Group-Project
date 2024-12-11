import React, { useEffect, useState } from "react";
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
import {
  getCar,
  getCarLatestData,
  getCarLiveData,
  getCarName,
  getTrips,
} from "apiClient";
import LiveData from "Types/LiveData";
import Trip from "Types/Trip";

const CarInfo: React.FC = () => {
  const navigate = useNavigate();

  const carId: string | undefined = useMatch("/carinfo/:carId")?.params.carId;

  const [isLive, setLive] = useState<boolean>(false);
  const [advanced, setAdvanced] = useState<boolean>(false);

  const [carData, setCarData] = useState<Vehicle>();
  const [carName, setCarName] = React.useState<string>();

  const [liveData, setLiveData] = useState<LiveData[]>([]);
  const [tripList, setTripList] = useState<Trip[]>([]);

  /** Fetch car data and name */
  useEffect(() => {
    if (carId) {
      getCar(carId)
        .then((response: Vehicle) => {
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
          if (response.length === 0) {
            console.log("No trips found");
          }
          if (response.length > 10) {
            setTripList(response.slice(response.length - 10, response.length));
          } else {
            setTripList(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      /*Last live data */
      getCarLatestData(carId)
        .then((response: LiveData) => {
          setLiveData([response]);
          setLive(response.carStatus ? true : false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/home");
    }
  }, []);

  const updateLiveData = () => {
    const latestLiveData = liveData[liveData.length - 1];
    const timestamp = latestLiveData ? latestLiveData.timestamp : 0;

    getCarLiveData(carId, timestamp)
      .then((response: LiveData[]) => {
        setLiveData((prev) => [...prev, ...response]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        updateLiveData();
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
            <NameDisplay data={carData} name={carName} />
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
                <Specs carData={carData} />
              </div>
            ) : null}
            {isLive ? (
              <div className="Main">
                <Live liveData={liveData} />
              </div>
            ) : null}
            <div className="Main">
              <FuelConsumpt carData={carData} liveData={liveData} />
            </div>
            {advanced ? (
              <div className="Main">
                <Advanced liveData={liveData} carData={carData} />
              </div>
            ) : null}
            <div className="Main">
              <CarInfoTrips trips={tripList} />
            </div>
            <div className="Main">
              <CarLocation car={carData} liveData={liveData} />
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
