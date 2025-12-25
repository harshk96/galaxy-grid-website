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
  const [authChecked, setAuthChecked] = useState(false);
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
    setAuthChecked(true);
  }, []);

  // Handle redirect after authentication check
  useEffect(() => {
    // Wait until we've checked localStorage for a token before redirecting
    if (!authChecked) return;

    if (!isAuthenticated && !location.pathname.includes('/admin/login')) {
      navigate('/admin/login', { replace: true });
    } else if (isAuthenticated && location.pathname === '/admin/login') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate, authChecked]);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    // The token should already be in localStorage from the Login component
    navigate('/admin/dashboard', { replace: true });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adminToken');
    navigate('/admin/login', { replace: true });
  };

  // If not authenticated and trying to access non-login page, show nothing until redirect
  // Normalize: always render the admin-app root so CSS/theme variables apply
  return (
    <div className={`admin-app ${isDark ? 'theme-dark' : 'theme-light'}`}>
      <div className="admin-layout">
        {/* If not authenticated, show login centered inside admin layout */}
        {!isAuthenticated ? (
          <div className="main-content fullwidth">
            <div className="admin-content flex items-center justify-center min-h-screen">
              <Login onLogin={handleLogin} />
            </div>
          </div>
        ) : (
          <>
            <Sidebar onLogout={handleLogout} />
            <div className="main-content">
              <Header user={user} onLogout={handleLogout} />
              <div className="admin-content">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="contacts" element={<ContactForms />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLayout;