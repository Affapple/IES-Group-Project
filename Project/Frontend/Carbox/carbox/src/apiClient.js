import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/v2";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
},
});

/// Temporariamente removido o interceptor de autenticação
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
//   }
//   return config;
// });

// Login (Mocked Response Temporário)
export const login = async (email, password) => {
  if (email === 'me@me.com' && password === '123') {
    return { token: 'mocked-auth-token' };
  }
  throw new Error('Invalid credentials');
};

// Register (Mocked Response Temporário)
export const register = async (email, password, phone, username) => {
  console.log('User registered:', { email, password, phone, username });
  return { message: 'Registration successful' };
};

// Get All Cars of User (Mocked Response Temporário)
export const getCars = async () => {
  return [
    { id: '1', name: "John's Car", license: '12-AB-34', live: true },
    { id: '2', name: "Mom's Car", license: '23-GW-43' },
    { id: '3', name: "Dad's Car", license: '20-SH-35' },
  ];
};


// Login
//export const login = async (email, password) => {
//  const response = await apiClient.post('/user/login', {
//    email,
//    password
//  });
//  return response.data;
//}

// Register
//export const register = async (email, password, phone, username) => {
//  const response = await apiClient.post('/user/account', {
//    email,
//    password,
//    phone,
//    username
//  });
//  return response.data;
//}

// Update User
export const updateUser = async (email, password, phone, username) => {
  const response = await apiClient.put('/user/account', {
    email,
    password,
    phone,
    username
  });
  return response.data;
}

// Get User
export const getUser = async () => {
  const response = await apiClient.get('/user/account');
  return response.data;
}

// Logout
export const logout = async () => {
  const response = await apiClient.post('/user/logout');
  return response.data;
}

// Get All Cars of User
//export const getCars = async () => {
//  const response = await apiClient.get('/vehicles');
//  return response.data;
//}

// Associate Car to User
export const associateCar = async (vehicleId, vehicle_name) => {
  const response = await apiClient.post('/vehicles/' + vehicleId + '/'+vehicle_name);
  return response.data;
}

// Get Car Data by Id
export const getCar = async (vehicleId) => {
  const response = await apiClient.get('/vehicles/' + vehicleId);
  return response.data;
}

// Get Car Name by Id
export const getCarName = async (vehicleId) => {
  const response = await apiClient.get('/vehicles/name/' + vehicleId);
  return response.data;
}

// Get Car Live Data after timestamp
export const getCarLiveData = async (vehicleId, timestamp) => {
  const response = await apiClient.get('/vehicles/live' + vehicleId + '/' + timestamp);
  return response.data;
}

// Get Car latest Data
export const getCarLatestData = async (vehicleId) => {
  const response = await apiClient.get('/vehicles/live/' + vehicleId);
  return response.data;
}


// Delete association of Car to User
export const deleteCar = async (vehicleId) => {
  const response = await apiClient.delete('/vehicles/' + vehicleId);
  return response.data;
}

// Get all trips of Car
export const getTrips = async (vehicleId, tripId) => {

    if(tripId!=null){
      const response = await apiClient.get('/vehicles/trips/' + vehicleId, {
        tripId
      });
      return response.data;
    }
  const response = await apiClient.get('/vehicles/trips/' + vehicleId);
  return response.data;
}

// Get last trip of Car
export const getLastTrip = async (vehicleId) => {
  const response = await apiClient.get('/vehicles/trips/lastest/' + vehicleId);
  return response.data;
}




