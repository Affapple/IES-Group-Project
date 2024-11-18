import { useState, useEffect, EventHandler } from "react";
import { User } from "Types/User";

function UserSettingsMenu({ toggleModal }) {
  function logout() {
    // TODO: Implement Logout
  }

  const user: User = {
    name: "Christian Oliveira",
    email: "email@email.com",
    phone_number: 966448679,
  };

  return (
    <div className="absolute z-20 px-5 py-1 bg-white w-max rounded-md shadow-lg border">
      <ul className="my-2">
        <li className="my-1 transition-transform duration-50 hover:scale-105">
          <i></i>
          <button onClick={toggleModal}>Edit Profile</button>
        </li>
        <li className="transition-transform duration-50 hover:scale-105">
          <i></i>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default UserSettingsMenu;
