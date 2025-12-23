import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/contacts', label: 'Contact Forms', icon: 'fas fa-envelope' },
    { path: '/users', label: 'Admin Users', icon: 'fas fa-users' }
  ];

  return (
    <div className="sidebar w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 flex-shrink-0">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] bg-clip-text text-transparent">
          GALAXY GRID
        </div>
        <p className="text-gray-400 text-sm">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={`/admin${item.path}`}
              className={`nav-link ${
                location.pathname === `/admin${item.path}` || (item.path === '/dashboard' && location.pathname === '/admin')
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              } block px-4 py-2 rounded-md transition-colors`}
            >
              <i className={`${item.icon} mr-3`}></i>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      
      <div className="p-4 flex-shrink-0 space-y-4">
        <div className="p-3 bg-gray-800 rounded-lg">
          <p className="text-gray-400 text-xs">Server Status</p>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-500 text-sm">Operational</span>
          </div>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-2 px-4 bg-gray-800 text-red-400 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
        >
          <i className="fas fa-sign-out-alt mr-3"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;