import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Footer from '../components/Footer';
import { register } from 'apiClient.js';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (!username || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all the fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null); // Reseta mensagens de erro
    setIsLoading(true); // Ativa estado de carregamento
    try {
      const response = await register(email, password, phone, username);

      if (!response)
        throw new Error("Something went wrong ")

      console.log('User registered:', { username, email, phone, password });
      navigate('/login', { replace: true }); // Redireciona para login após sucesso
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Desativa estado de carregamento
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans">
      {/* Logo */}
      <div className="mb-8 mt-8 animate-fade-in-down">
        <img src="/src/assets/logo.png" alt="Logo" className="w-16 h-16 mx-auto" />
      </div>

      {/* Register Box */}
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md border border-green-300 relative animate-scale-up">
        {/* Back Arrow */}
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 top-4 text-gray-600 transition duration-300 hover:text-green-500"
        >
          ←
        </button>

        {/* Sign Up Title */}
        <h2 className="text-center text-2xl font-medium mb-6 text-gray-800 p-12">Sign up</h2>

        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 mb-1">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-600 mb-1">Phone number</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-600 mb-1">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6 relative">
          <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">Confirm password</label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={isLoading}
          className={`w-full bg-green-500 text-white py-2 rounded-md font-semibold transition transform hover:scale-105 duration-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;