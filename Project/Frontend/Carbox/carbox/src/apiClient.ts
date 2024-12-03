import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL + "/api/v2";
console.log(VITE_API_URL);
console.log(import.meta.env.API_URL);
const apiClient = axios.create({
    baseURL: VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

function loadToken() {
    apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${localStorage.getItem("token")}`;
}
function unloadToken() {
    apiClient.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("token");
}

// Login
export const login = async (email, password) => {
    const response = await apiClient.post("/user/login", {
        email,
        password,
    });
    const token = response.data.token;
    console.log("Token = " + token);
    localStorage.setItem("token", token);
    return response.data;
};

// Register
export const register = async (email, password, phone, username) => {
    console.log(apiClient.defaults.headers.common);
    const response = await apiClient.post("/user/accountCreation", {
        email,
        password,
        phone,
        username,
    });
    return response.data;
};

// Update User
export const updateUser = async (email, password, phone, username) => {
    loadToken();
    const response = await apiClient.put("/user/account", {
        email,
        password,
        phone,
        username,
    });
    return response.data;
};

// Get User
export const getUser = async () => {
    loadToken();
    const response = await apiClient.get("/user/account");
    return response.data;
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
