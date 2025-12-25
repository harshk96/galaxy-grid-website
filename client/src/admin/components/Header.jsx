import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = ({ user, onLogout }) => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold capitalize">
          {location.pathname.split('/').pop().split('?')[0] || 'Dashboard'}
        </h1>
      </div>
      
      <div className="flex items-center">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn mr-4"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          )}
        </button>
        
        <button
          onClick={onLogout}
          className="btn-ghost"
          aria-label="Logout"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;