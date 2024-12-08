import { useState, useEffect, EventHandler } from "react";
import User from "Types/User";
import Modal from "../Modal";
import { logout, updateUser } from 'apiClient'
import { redirect, useNavigate } from "react-router-dom";

function UserSettingsMenu({ open, user } : {open: boolean, user: User}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phoneNumber);
  const [password, setPassword] = useState("");
  const [modalShown, setModalShown] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateUser(email, password, name, phone)
  
    if (response)
      toggleModal();
  };

  const resetForm = (event) => {
    event.preventDefault();
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phoneNumber);
    setPassword("");
    setModalShown(false);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response)
      navigate('/', { replace: true });
  }

  const toggleModal = () => {
    setModalShown((modalShown) => !modalShown)
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phoneNumber);
  }

  return (
    <>
      {open ? (
        <div className="absolute z-9 px-5 py-1 bg-white w-max rounded-md shadow-lg border">
          <ul className="my-2">
            <li className="my-1 transition-transform duration-50 hover:scale-105">
              <i></i>
              <button onClick={toggleModal}>Edit Profile</button>
            </li>
            <li className="transition-transform duration-50 hover:scale-105">
              <i></i>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}

      {modalShown ? (
        <Modal>
          <div className="flex-cols">
            <h1 className="text-center">
              <b>User Settings</b>
            </h1>
            <div className="flex justify-center">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="py-2 grid grid-cols-4">
                    <span className="col-span-1">Name:</span>
                    <input
                      className="border mx-2 flex-grow col-span-3"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label className="py-2 grid grid-cols-4">
                    Email:
                    <input
                      className="border mx-2 flex-grow col-span-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label className="py-2 grid grid-cols-4">
                    Phone:
                    <input
                      className="border mx-2 flex-grow col-span-3"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                  <label className="py-2 grid grid-cols-4">
                    Password:
                    <input
                      className="border mx-2 flex-grow col-span-3"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </div>
                <div className="flex justify-center py-8 gap-5">
                  <button
                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserSettingsMenu;
