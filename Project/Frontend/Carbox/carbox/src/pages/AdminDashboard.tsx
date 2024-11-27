import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/admin/data", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching admin data:", error));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
