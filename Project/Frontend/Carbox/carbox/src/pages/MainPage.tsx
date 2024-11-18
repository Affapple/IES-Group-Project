import React from "react";
import Navbar from "components/NavBar";
import Footer from "components/Footer";

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Main Content */}
      <main className="px-8 py-12">
        {/* Gallery Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <img
              key={num}
              src={`/src/assets/vehicle${num}.jpg`}
              alt={`Vehicle ${num}`}
              className="rounded-lg object-cover h-40 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
          ))}
        </section>

        {/* Vehicle Selector */}
        <section className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            My Vehicles
          </h2>
          <div className="flex items-center space-x-4 overflow-x-auto">
            {[
              {
                name: "John's Car",
                license: "12-AB-34",
                autonomy: "431 km",
                battery: "Optimal",
              },
              {
                name: "Mom's",
                license: "23-GW-43",
                autonomy: "216 km",
                battery: "Low",
                highlighted: true,
              },
              {
                name: "Dad's",
                license: "20-SH-35",
                autonomy: "198 km",
                battery: "Optimal",
                live: true,
              },
              {
                name: "Smart",
                license: "94-OF-12",
                autonomy: "352 km",
                battery: "Medium",
              },
            ].map((vehicle, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${vehicle.highlighted ? "bg-gray-700 text-white" : "bg-white"
                  } shadow-md min-w-[200px] transition transform hover:scale-105 flex flex-col items-center`}
              >
                {/* Vehicle Name and License */}
                <h3
                  className={`text-xl font-semibold ${vehicle.highlighted ? "text-white" : "text-gray-800"}`}
                >
                  {vehicle.name}
                </h3>
                <p
                  className={`text-sm ${vehicle.highlighted ? "text-gray-300" : "text-gray-500"}`}
                >
                  {vehicle.license}
                </p>

                {/* Autonomy and Battery */}
                <div className="flex flex-col items-center mt-4">
                  <p className="text-gray-500 text-sm">Autonomy</p>
                  <p className="text-gray-800 text-lg font-semibold">
                    {vehicle.autonomy}
                  </p>
                </div>
                <div className="flex flex-col items-center mt-2">
                  <p className="text-gray-500 text-sm">Battery</p>
                  <p
                    className={`text-lg font-semibold ${vehicle.battery === "Optimal"
                        ? "text-green-500"
                        : vehicle.battery === "Medium"
                          ? "text-yellow-500"
                          : vehicle.battery === "Low"
                            ? "text-red-500"
                            : "text-gray-500"
                      }`}
                  >
                    {vehicle.battery}
                  </p>
                </div>

                {/* Live Indicator */}
                {vehicle.live && (
                  <span className="mt-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    LIVE
                  </span>
                )}

                {/* More Info Button */}
                <button className="mt-4 w-full bg-gray-800 text-white py-2 rounded-md font-medium hover:bg-gray-900 transition duration-300">
                  More info →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Vehicle Info Section */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Last Location Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Last location
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Rua dos Olivais da Penteada de Baixo, Aveiro, Portugal
            </p>
            <img
              src="/src/assets/vehicle-map.png"
              alt="Vehicle Map"
              className="rounded-lg w-full h-40 object-cover shadow-sm"
            />
          </div>

          {/* Last Trip Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Last trip
            </h4>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-sm font-medium text-gray-800">
                08 October 2024
              </p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-sm font-medium text-gray-800">8 min</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Distance</p>
              <p className="text-sm font-medium text-gray-800">3.3 km</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Consumption</p>
              <p className="text-sm font-medium text-green-500">0.21 L</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;
