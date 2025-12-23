import React, { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        onLogin(data.user);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || errorData.message || errorData.error || 'Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="login-card w-full max-w-md p-8 rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] bg-clip-text text-transparent mb-2">
            GALAXY GRID
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent transition-all"
              placeholder="admin@galaxygrid.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Default credentials: admin@galaxygrid.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;