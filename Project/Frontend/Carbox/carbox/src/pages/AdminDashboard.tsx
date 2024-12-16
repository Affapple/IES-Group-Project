import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "Types/User";
import Vehicle from "Types/Vehicle";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import "../css/AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL + "/api/v2";
  //const VITE_API_URL = "http://localhost:8080" + "/api/v2";

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelected] = useState<User | undefined>(undefined);
  const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);

  /* Fetch all users */
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(VITE_API_URL + "/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data ? setUsers(response.data) : [];
      })
      .catch((error) => console.error("Error fetching admin data:", error));
  }, []);

  /* Fetch cars of a user */
  useEffect(() => {
    if (selectedUser == undefined) return;

    const token = localStorage.getItem("token");
    axios
      .get(VITE_API_URL + "/admin/cars", {
        // ! It was vehicles, which makes more sense than cars honestly
        headers: { Authorization: `Bearer ${token}` },
        params: { email: selectedUser.email },
      })
      .then((response) => (response.data ? setUserVehicles(response.data) : []))
      .catch((error) => console.error("Error fetching user vehicles: ", error));
  }, [selectedUser]);

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="content">
        <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
          Admin Dashboard
        </h1>

        {/* Users List */}
        <h2 style={{ fontWeight: "bold" }}>Users</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>
                  <button
                    className="link-button"
                    onClick={() => setSelected(user)}
                  >
                    {user.name}
                  </button>
                </td>
                <td>{/* Add actions if needed */}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Car List of Selected User */}
        {selectedUser && (
          <>
            <h2 style={{ fontWeight: "bold" }}>
              Vehicles of {selectedUser.name}
            </h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>ECU ID</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>License Plate</th>
                </tr>
              </thead>
              <tbody>
                {userVehicles.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No vehicles found</td>
                  </tr>
                ) : (
                  userVehicles.map((vehicle: Vehicle) => (
                    <tr key={vehicle.ecuId}>
                      <td>{vehicle.ecuId}</td>
                      <td>{vehicle.brand}</td>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.licensePlate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
