import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../admin.css';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import ContactForms from '../components/ContactForms';
import AdminUsers from '../components/AdminUsers';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      // In a real app, you'd verify the token and get user data
      setUser({ username: 'admin', role: 'admin' });
    }
  }, []);

  // Handle redirect after authentication check
  useEffect(() => {
    if (!isAuthenticated && !location.pathname.includes('/admin/login')) {
      navigate('/admin/login');
    } else if (isAuthenticated && location.pathname === '/admin/login') {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    // The token should already be in localStorage from the Login component
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // If not authenticated and trying to access non-login page, show nothing until redirect
  if (!isAuthenticated && !location.pathname.includes('/admin/login')) {
    return null;
  }

  // If authenticated and on login page, redirect to dashboard
  if (isAuthenticated && location.pathname === '/admin/login') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Show admin layout for authenticated users
  return (
    <div className={`admin-app ${isDark ? 'theme-dark' : 'theme-light'}`}>
      <div className="admin-layout">
        <Sidebar onLogout={handleLogout} />
        <div className="main-content">
          <Header user={user} onLogout={handleLogout} />
          <div className="admin-content">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="contacts" element={<ContactForms />} />
              <Route path="users" element={<AdminUsers />} />
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;