import React, { useState } from "react";
import User from "Types/User";

function Modal({ children, id }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const user: User = {
    name: name,
    email: email,
    phoneNumber: phone,
    password: password,
  };

  const handleSubmit = (event) => {
    // TODO: Implementar API call para editar os dados
    event.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Password:", password);
  };
  
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg px-10 py-8">
            <div className="sm:flex sm:items-start">
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
                  <div className="flex justify-center py-8">
                  <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" type="submit">Submit</button>
                  </div>
                </form>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
