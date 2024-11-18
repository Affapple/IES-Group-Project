import React, { useState } from 'react';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (vehicle: { licensePlate: string; name: string; ecuId: string }) => void;
}

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose, onAddVehicle }) => {
  const [newVehicle, setNewVehicle] = useState({
    licensePlate: '',
    name: '',
    ecuId: '',
  });

  const handleAddVehicle = () => {
    if (!newVehicle.licensePlate || !newVehicle.name || !newVehicle.ecuId) {
      alert('Please fill in all fields');
      return;
    }
    onAddVehicle(newVehicle);
    setNewVehicle({ licensePlate: '', name: '', ecuId: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl relative font-poppins">
        {/* Close Button */}
        <button
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          ←
        </button>
        {/* Modal Title */}
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">Add new vehicle</h2>
        <p className="text-gray-500 mb-6 text-center">Make sure your car is running</p>

        {/* License Plate Input */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Insert car license plate number:</label>
          <input
            type="text"
            value={newVehicle.licensePlate}
            onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Car Name Input */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Insert car name:</label>
          <input
            type="text"
            value={newVehicle.name}
            onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* ECU ID Input */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Insert ECU device ID:</label>
          <input
            type="text"
            value={newVehicle.ecuId}
            onChange={(e) => setNewVehicle({ ...newVehicle, ecuId: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition transform hover:scale-105"
            onClick={handleAddVehicle}
          >
            Connect to device
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleModal;