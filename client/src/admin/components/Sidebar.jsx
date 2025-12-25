import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/contacts', label: 'Contact Forms', icon: 'fas fa-envelope' },
    { path: '/users', label: 'Admin Users', icon: 'fas fa-users' }
  ];

  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="sidebar flex flex-col h-full w-64">
      {/* Brand Header */}
      <div className="p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] bg-clip-text text-transparent tracking-tight">
          GALAXY GRID
        </h1>
        <p className="muted small uppercase tracking-widest mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const to = `/admin${item.path}`;
            const isActive = location.pathname === to || (item.path === '/dashboard' && (location.pathname === '/admin' || location.pathname === '/admin/' || location.pathname === '/admin/dashboard'));

            return (
              <li key={index}>
                <Link
                  to={to}
                  className={`nav-link flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'active' : ''}`}
                >
                  <i className={`${item.icon} w-6 transition-transform group-hover:scale-300`}></i>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 flex-shrink-0 border-t">


        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="btn-ghost w-full flex items-center px-4 py-3 rounded-lg"
        >
          <i className="fas fa-sign-out-alt w-6 mr-3"></i>
          <span className="font-medium">Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;