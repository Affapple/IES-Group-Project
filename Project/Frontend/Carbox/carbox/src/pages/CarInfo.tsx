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
import { getCar, getCarLatestData, getCarLiveData, getTrips } from "apiClient";
import LiveData from "Types/LiveData";
import Trip from "Types/Trip";

const CarInfo: React.FC = (props) => {
  const navigate = useNavigate();

  const carId: string | undefined = useMatch("/carinfo/:carId")?.params.carId;

  const [isLive, setLive] = useState<boolean>(true);
  const [advanced, setAdvanced] = useState<boolean>(false);

  const [carData, setCarData] = useState<Vehicle>();
  const [liveData, setLiveData] = useState<LiveData>({} as LiveData);
  const [liveDataList, setLiveDataList] = useState<LiveData[]>([]);

  const [tripList, setTripList] = useState<Trip[]>([]);

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
      .then((response: LiveData) => {
        setLiveData(response);
        setLive(response.carStatus);
        console.log("Fetched live data: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [carData]);

  /** Fetch latest data */
  const getLatestLiveData = () => {
    getCarLiveData(carId, liveData.timestamp)
      .then((response: LiveData[]) => {
        console.log("Fetched repsonse: " + response);
        if (response.length === 0) return;

        const latest = response[response.length - 1];
        setLiveDataList((prev) => [...prev, ...response]);
        setLiveData(latest);

        const newLiveStatus = latest.carStatus;
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
                <Specs liveData={liveData} carData={carData} />
              </div>
            ) : null}
            {isLive ? (
              <div className="Main">
                <Live listLiveData={liveDataList} />
              </div>
            ) : null}
            <div className="Main">
              <FuelConsumpt data={carData} />
            </div>
            {advanced ? (
              <div className="Main">
                <Advanced liveData={liveData} carData={carData} />
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
