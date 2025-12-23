import React, { useState, useEffect } from 'react';
import api from '../utils/api';

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
        const data = await api.get('/contacts');
        if (data) {
          // Get only the 5 most recent contacts
          setRecentContacts(data.slice(0, 5) || []);
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

  return (
    <div className="dashboard p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Manage contact forms and user interactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card p-6 rounded-xl bg-gray-800 border border-gray-700">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <i className={`${stat.icon} ${stat.color} text-xl`}></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Contact Forms</h2>
          <div className="space-y-4">
            {loading.contacts ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#ec2626]"></div>
              </div>
            ) : recentContacts.length > 0 ? (
              recentContacts.map((contact, index) => (
                <div key={contact._id || contact.id || index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{contact.name}</p>
                    <p className="text-gray-400 text-sm">{contact.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${contact.status === 'new' ? 'bg-yellow-500/20 text-yellow-500' : contact.status === 'in-progress' ? 'bg-blue-500/20 text-blue-500' : contact.status === 'resolved' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                      {contact.status ? contact.status.replace('-', ' ') : 'New'}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">
                      {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No recent contact forms</p>
            )}
          </div>
        </div>

        {/* Admin Users */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Admin Users</h2>
          <div className="space-y-4">
            {loading.users ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#ec2626]"></div>
              </div>
            ) : adminUsers.length > 0 ? (
              adminUsers.map((user, index) => (
                <div key={user._id || user.id || index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                      <i className="fas fa-user text-gray-300"></i>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.username}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No admin users found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;