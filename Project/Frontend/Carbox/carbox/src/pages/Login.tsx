import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Footer from '../components/Footer';
import { login } from 'apiClient.js';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // Para exibir mensagens de erro
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Desativa qualquer validação ou autenticação
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    login(email, password).then((response) => {
      navigate('/home');
    }).catch((err) => {
      switch (err.response.status) {
        case 401:
          setError("Invalid Credentials!");
          break;
        default:
          setError("An unexpected error occurred. Please try again.");
      }
    });
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

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-600 mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition-all duration-300"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/4 transform -translate-y-1/2 text-gray-500 text-sm flex items-center space-x-1 transition duration-300 hover:text-green-500"
          >
            {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
            <span>{showPassword ? 'Hide' : 'Show'}</span>
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded-md font-semibold transition transform hover:scale-105 duration-300 hover:bg-green-600"
        >
          Login
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;