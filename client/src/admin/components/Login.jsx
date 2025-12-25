import React, { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
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
    <div className="login-container min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">

      <div className="login-card w-full max-w-md">

        <div className="p-6 sm:p-10">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tighter
                            bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] bg-clip-text text-transparent mb-2">
              GALAXY GRID
            </div>
            <h1 className="text-xl font-bold">Admin Portal</h1>
            <p className="muted mt-1">Sign in to your account</p>
          </header>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 login-error text-center">{error}</div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@galaxygrid.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn w-full mt-2">Sign In</button>
          </form>

          {/* Demo Box */}
          <footer className="mt-8 pt-6 border-t">
            <div className="p-4 rounded-xl login-demo text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-widest mb-2 font-semibold muted">Demo Access</p>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-mono muted break-all">admin@galaxygrid.com</p>
                <p className="text-xs sm:text-sm font-mono muted">admin123</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;