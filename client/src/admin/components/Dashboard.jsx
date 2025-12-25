import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    newContacts: 0,
    inProgressContacts: 0,
    resolvedContacts: 0,
    totalAdmins: 0
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState({
    stats: true,
    contacts: true,
    users: true
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const { isDark } = useTheme();

  // Fetch dashboard stats from API
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const data = await api.get('/admin/dashboard');
        if (data) {
          setStats({
            totalContacts: data.totalContacts,
            newContacts: data.newContacts,
            inProgressContacts: data.inProgressContacts,
            resolvedContacts: data.resolvedContacts,
            totalAdmins: data.totalAdmins
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(prev => ({ ...prev, stats: false }));
      }
    };
    
    const fetchRecentContacts = async () => {
      try {
        // Fetch only the first page with limited results for recent contacts
        const data = await api.get('/admin/contacts?page=1&limit=5');
        if (data) {
          // If the API returns paginated data, use the contacts array
          const contacts = data.contacts || data;
          // Get only the 5 most recent contacts
          setRecentContacts(contacts.slice(0, 5) || []);
        }
      } catch (error) {
        console.error('Error fetching recent contacts:', error);
      } finally {
        setLoading(prev => ({ ...prev, contacts: false }));
      }
    };
    
    const fetchAdminUsers = async () => {
      try {
        const data = await api.get('/admin/users');
        if (data) {
          // Get only the 3 most recent admin users
          setAdminUsers(data.slice(0, 3) || []);
        }
      } catch (error) {
        console.error('Error fetching admin users:', error);
      } finally {
        setLoading(prev => ({ ...prev, users: false }));
      }
    };
    
    fetchDashboardStats();
    fetchRecentContacts();
    fetchAdminUsers();
  }, []);

  const statCards = [
    {
      title: 'Total Forms',
      value: stats.totalContacts,
      icon: 'fas fa-envelope',
      color: 'text-red-500',
      bg: 'bg-red-500/20'
    },
    {
      title: 'New Forms',
      value: stats.newContacts,
      icon: 'fas fa-exclamation-circle',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/20'
    },
    {
      title: 'In Progress',
      value: stats.inProgressContacts,
      icon: 'fas fa-spinner',
      color: 'text-blue-500',
      bg: 'bg-blue-500/20'
    },
    {
      title: 'Resolved',
      value: stats.resolvedContacts,
      icon: 'fas fa-check-circle',
      color: 'text-green-500',
      bg: 'bg-green-500/20'
    }
  ];

  const colorMap = {
    red: '#ec2626',
    yellow: '#f59e0b',
    blue: '#3b82f6',
    green: '#10b981'
  };

  const renderStatIcon = (index) => {
    const icons = [
      // envelope
      (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M3 8.5v7A2.5 2.5 0 005.5 18h13A2.5 2.5 0 0021 15.5v-7"/><path d="M21 8.5l-9 6-9-6"/></svg>),
      // exclamation
      (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>),
      // spinner (clock)
      (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M12 6v6l4 2"/><path d="M21.17 8A9 9 0 1111 3"/></svg>),
      // check
      (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M20 6L9 17l-5-5"/></svg>)
    ];
    return icons[index] || icons[0];
  };

  return (
    <div className={`dashboard p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manage contact forms and user interactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const colorKey = index === 0 ? 'red' : index === 1 ? 'yellow' : index === 2 ? 'blue' : 'green';
          const color = colorMap[colorKey];
          return (
          <div key={index} className={`stat-card p-6 rounded-xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
            <div className="flex items-center">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}22` }}>
                <div style={{ color }}>{renderStatIcon(index)}</div>
              </div>
              <div className="ml-4">
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        )})}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Recent Contact Forms</h2>
          <div className="space-y-4">
            {loading.contacts ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#ec2626]"></div>
              </div>
            ) : recentContacts.length > 0 ? (
              recentContacts.map((contact, index) => (
                <div 
                  key={contact._id || contact.id || index} 
                  className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} cursor-pointer hover:opacity-80 transition-opacity`}
                  onClick={() => {
                    setSelectedContact(contact);
                    setShowViewModal(true);
                  }}
                >
                  <div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{contact.name}</p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{contact.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${contact.status === 'new' ? 'bg-yellow-500/20 text-yellow-500' : contact.status === 'in-progress' ? 'bg-blue-500/20 text-blue-500' : contact.status === 'resolved' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                      {contact.status ? contact.status.replace('-', ' ') : 'New'}
                    </span>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs mt-1`}>
                      {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-4`}>No recent contact forms</p>
            )}
          </div>
        </div>

        {/* Admin Users */}
        <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Admin Users</h2>
          <div className="space-y-4">
            {loading.users ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#ec2626]"></div>
              </div>
            ) : adminUsers.length > 0 ? (
              adminUsers.map((user, index) => (
                <div key={user._id || user.id || index} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center mr-3`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" style={{ color: isDark ? '#cbd5e1' : '#374151' }}><path d="M20 21v-2a4 4 0 00-3-3.87"/><path d="M4 21v-2a4 4 0 013-3.87"/><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    </div>
                    <div>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{user.username}</p>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{user.email}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))
            ) : (
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-4`}>No admin users found</p>
            )}
          </div>
        </div>
      </div>

      {/* View Contact Modal */}
      {showViewModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className={`text-lg ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Name</p>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedContact.name}</p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedContact.email}</p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Project Type</p>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedContact.projectType}</p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${selectedContact.status === 'new' ? 'bg-yellow-500/20 text-yellow-500' : selectedContact.status === 'in-progress' ? 'bg-blue-500/20 text-blue-500' : selectedContact.status === 'resolved' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                  {selectedContact.status ? selectedContact.status.replace('-', ' ') : 'New'}
                </span>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Priority</p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${selectedContact.priority === 'low' ? 'bg-green-500/20 text-green-500' : selectedContact.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' : selectedContact.priority === 'high' ? 'bg-orange-500/20 text-orange-500' : selectedContact.priority === 'urgent' ? 'bg-red-500/20 text-red-500' : 'bg-gray-500/20 text-gray-500'}`}>
                  {selectedContact.priority || 'medium'}
                </span>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Message</p>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedContact.message}</p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Date</p>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedContact.createdAt ? new Date(selectedContact.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;