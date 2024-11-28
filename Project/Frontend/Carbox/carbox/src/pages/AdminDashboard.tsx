import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import User from "Types/User";
import Vehicle from "Types/Vehicle";

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelected] = useState<User | undefined>(undefined);
  const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);

  /* Fetch all users */ 
  useEffect(() => {    
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/v2/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response)
        return response.data ? setUsers(response.data) : []
      })
      .catch((error) => console.error("Error fetching admin data:", error));
  }, []);

  /* Fetch cars of a user */
  useEffect(() => {
    if (selectedUser == undefined) return;

    const token = localStorage.getItem("token");
    axios.get("http://localhost:8080/api/v2/admin/cars/" + selectedUser.email, {   // ! It was vehicles, which makes more sense than cars honestly
      headers: { Authorization: `Bearer ${token}`},
    })
    .then((response) => response.data ? setUserVehicles(response.data) : [])
    .catch((error) => console.error("Error fetching user vehicles: ", error));
  }, [selectedUser])

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Users List*/}
      <table>
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
                <a onClick={() => setSelected(user)}>{user.name}</a>
              </td>
              <td>
                {/* <button>Edit</button>
                <button>Delete</button> */}
                {/* For now we just want ot see the data */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Car List of selected User */}
      { selectedUser &&
      <>
        <h1>Vehicles of {selectedUser.name}</h1>
          <table>
            <thead>
              <tr>
                <th>ECU ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>License plate</th>
              </tr>
            </thead>
            <tbody>
            {userVehicles.map((vehicle: Vehicle) => 
              <tr key={vehicle.ecuId}>
                <td>{vehicle.ecuId}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.licensePlate}</td>
              </tr>
            )}
            </tbody>
          </table>
      </>
      }
    </div>
  );
};

export default AdminDashboard;
