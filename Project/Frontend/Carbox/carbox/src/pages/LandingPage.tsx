import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative p-5 min-h-screen bg-[#F8F9FA] font-dm-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-5 md:px-10">
        <div className="flex items-center">
          <img src="/src/assets/logo.png" alt="Logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-[34.87px] font-semibold text-[#2C2C2C] ml-5 font-poppins">CarBox</span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="text-[18.61px] font-medium text-[#2C2C2C] font-poppins transition hover:text-[#30D354]"
          >
            Sign in
          </button>
          <button 
          onClick={() => navigate('/register')}
          className="text-[18.61px] font-medium text-white bg-[#30D354] px-4 py-2 rounded-md font-poppins transition hover:bg-[#28c545]">
            Sign up
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-col md:flex-row items-center justify-between py-10">
        {/* Text Section */}
        <div className="md:pl-[150px] md:pt-[120px]">
          <h1 className="max-w-[350px] text-[44.95px] font-semibold text-[#2C2C2C] leading-tight font-poppins">
            The best way to keep up with{' '}
            <span className="relative text-[#30D354] font-bold after:absolute after:bottom-0 after:left-0 after:h-[4px] after:bg-[#30D354] after:w-0 after:transition-all after:duration-300 hover:after:w-full">
              your car
            </span>
          </h1>
          <p className="max-w-[350px] text-[16.85px] text-[#6C757D] mt-5 font-dm-sans leading-[25.28px]">
            A streamlined hub for everything about my car—specs, maintenance, fuel efficiency, and custom upgrades—all
            in one place. Easy to access, simple to navigate.
          </p>
        </div>

        {/* Car Image */}
        <div className="relative mt-10 md:mt-0">
          <img src="/src/assets/car.png" alt="Car" className="w-[1200px] max-w-full h-auto" />
        </div>
      </main>

       {/* Footer */}
       <footer className="text-center mt-24">
        <p className="text-[16.85px] text-[#6C757D] font-dm-sans leading-[25.28px] mb-5">
          Check your:
        </p>

        <div className="flex justify-center gap-10 mt-5">
          {["Battery", "Last Location", "Autonomy", "Fuel Averages", "Last Trips"].map((feature) => (
            <div key={feature} className="w-[140.46px] h-[140.46px] border-2 border-[#30D354] rounded-full flex items-center justify-center  hover:bg-green-50 transition transform hover:scale-105 duration-300">
              <span className="text-[13.11px] font-bold text-[#30D354] uppercase font-poppins tracking-wider text-center ">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;