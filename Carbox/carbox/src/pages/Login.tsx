import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // adicionar a lógica de autenticação
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans">
      {/* Logo */}
      <div className="mb-10 animate-fade-in-down">
        <img src="/src/assets/logo.png" alt="Logo" className="w-16 h-16 mx-auto" />
      </div>

      {/* Login Box */}
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md border border-green-300 relative animate-scale-up">
        {/* Back Arrow */}
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 top-4 text-gray-600 transition duration-300 hover:text-green-500"
        >
          ←
        </button>

        {/* Sign In Title */}
        <h2 className="text-center text-2xl font-medium mb-6 text-gray-800 p-12">Sign in</h2>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6 relative">
          <label className="block text-gray-600 mb-1">Your password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition-all duration-300"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/4 transform -translate-y-1/2 text-gray-500 text-sm flex items-center space-x-1 transition duration-300 hover:text-green-500"
          >
            {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
            <span>{showPassword ? "Hide" : "Show"}</span>
          </button>
        </div>

        {/* Login Button */}
        <button 
            onClick={handleLogin}
            className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition transform hover:scale-105 duration-300">
          Login
        </button>

        {/* Terms and Privacy Policy */}
        <p className="text-center text-sm text-gray-500 mt-4">
          By continuing, you agree to the <a href="#" className="text-green-500 underline">Terms of use</a> and <a href="#" className="text-green-500 underline">Privacy Policy</a>.
        </p>

        {/* Forgot Password */}
        <p className="text-center mt-4">
          <a href="#" className="text-gray-600 underline">Forgot your password?</a>
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center my-6 w-full max-w-md animate-fade-in-up">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-gray-500">New to our community?</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Create Account Button */}
      <button onClick={() => navigate('/register')} className="w-full max-w-md bg-white border border-green-500 text-green-500 py-2 rounded-md font-semibold hover:bg-green-50 transition transform hover:scale-105 duration-300">
        Create an account
      </button>

      {/* Footer Links */}
      <footer className="mt-16 text-center text-sm text-gray-500">
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Help Center</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;