import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import CarInfo from "./pages/CarInfo";
import MainPage from "./pages/HomePage";
import UserVehicles from "./pages/UserVehicles";
import AdminDashboard from "./pages/AdminDashboard";
import { UserContext, IUserData } from "Context/UserContext";
import { getUser, unloadToken } from "apiClient";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<IUserData>({
    role: "",
  } as IUserData);

  useEffect(() => {
    getUser()
      .then((response) => {
        const user = response.data;
        setCurrentUser({ role: user.role }); // TODO: Set to save user data
        setLoading(false);
      })
      .catch((err) => {
        unloadToken();
        setCurrentUser({ role: "" });
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Router>
      <UserContext.Provider
        value={{ currentUser: currentUser, setCurrentUser: setCurrentUser }}
      >
        <Routes>
          {/* Path that always exists */}
          <Route path="/" element={<LandingPage />} />

          {/* If user is not authenticated */}
          {(currentUser.role == "" || currentUser.role == undefined) && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {/* If user is authenticated */}
          {currentUser.role != "" && (
            <>
              <Route path="/home" element={<MainPage />} />
              <Route path="/carinfo/:carId" element={<CarInfo />} />
              <Route path="/myvehicles" element={<UserVehicles />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}

          {/* If user is admin */}
          {currentUser.role == "ADMIN" && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
            </>
          )}
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
