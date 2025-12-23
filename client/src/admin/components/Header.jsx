import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = ({ user, onLogout }) => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-white capitalize">
          {location.pathname.split('/').pop().split('?')[0] || 'Dashboard'}
        </h1>
      </div>
      
      <div className="flex items-center">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] text-white mr-4 hover:opacity-90 transition-opacity shadow-lg"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
            <i className="fas fa-user text-gray-300"></i>
          </div>
          <div className="mr-4">
            <p className="text-sm font-medium text-white">{user?.username}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;