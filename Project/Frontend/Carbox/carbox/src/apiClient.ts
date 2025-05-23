import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL + "/api/v2";
//const VITE_API_URL = "http://deti-ies-09.ua.pt:8080" + "/api/v2";

const apiClient = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response && error.response.status == 403) {
      console.error("Access Forbidden, deleting previous invalid session...");
      unloadToken();
    }
    return Promise.reject(error);
  },
);

function loadToken() {
  const token = localStorage.getItem("token");
  if (token == null) return false;

  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return true;
}

export function unloadToken() {
  apiClient.defaults.headers.common["Authorization"] = undefined;
  localStorage.removeItem("token");
}

// Login
export const login = async (email, password) => {
  const response = await apiClient.post("/user/login", {
    email,
    password,
  });
  return response.data;
};

// Register
export const register = async (email, password, phone, username) => {
  const response = await apiClient.post("/user/accountCreation", {
    email,
    password,
    phone,
    username,
  });
  return response.data;
};

// Update User
export const updateUser = async (email, password, username, phone) => {
  loadToken();
  const response = await apiClient.put("/user/account", {
    username,
    email,
    phone,
    password
  });
  return response.data;
};

// Get User
export const getUser = async () => {
  if (!loadToken())
    return {
      status: 403,
      data: {},
    };

  const response = await apiClient.get("/user/account");
  return response;
};

// Logout
export const logout = async () => {
  loadToken();
  const response = await apiClient.post("/user/logout");
  unloadToken();

  return response.data;
};

// Get All Cars of User

export const getCars = async () => {
  loadToken();
  const response = await apiClient.get("/vehicles");
  return response.data;
};

// Associate Car to User
export const associateCar = async (vehicleId, vehicle_name) => {
  loadToken();
  const response = await apiClient.post(
    "/vehicles/" + vehicleId + "/" + vehicle_name,
  );
  return response.data;
};

// Get Car Data by Id
export const getCar = async (vehicleId) => {
  loadToken();
  const response = await apiClient.get("/vehicles/" + vehicleId);
  return response.data;
};

// Get Car Name by Id
export const getCarName = async (vehicleId) => {
  loadToken();
  const response = await apiClient.get("/vehicles/name/" + vehicleId);
  return response.data;
};

// Get Car Live Data after timestamp
export const getCarLiveData = async (vehicleId, timestamp) => {
  loadToken();
  const response = await apiClient.get(
    "/vehicles/live/" + vehicleId + "/" + timestamp,
  );
  return response.data;
};

// Get Car latest Data
export const getCarLatestData = async (vehicleId) => {
  loadToken();
  const response = await apiClient.get("/vehicles/live/" + vehicleId);
  return response.data;
};

// Delete association of Car to User
export const deleteCar = async (vehicleId) => {
  loadToken();
  const response = await apiClient.delete("/vehicles/" + vehicleId);
  return response.data;
};

// Get all trips of Car
export const getTrips = async (vehicleId, tripId) => {
  loadToken();
  if (tripId != null) {
    const response = await apiClient.get("/vehicles/trips/" + vehicleId, {
      params: {
        tripId: tripId,
      },
    });
    return response.data;
  }
  const response = await apiClient.get("/vehicles/trips/" + vehicleId);
  return response.data;
};

// Get last trip of Car
export const getLastTrip = async (vehicleId) => {
  loadToken();
  const response = await apiClient.get("/vehicles/trips/latest/" + vehicleId);
  return response.data;
};
