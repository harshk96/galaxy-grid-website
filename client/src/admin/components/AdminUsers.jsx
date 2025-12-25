import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [editingUser, setEditingUser] = useState({
    id: '',
    username: '',
    email: '',
    role: 'admin',
    isActive: true
  });
  const [error, setError] = useState('');
  const { isDark } = useTheme();

  // Fetch admin users from API
  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        setLoading(true);
        const data = await api.get('/admin/users');
        if (data) {
          setUsers(data);
        }
      } catch (error) {
        console.error('Error fetching admin users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminUsers();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    try {
      setError(''); // Clear previous error
      const addedUser = await api.post('/admin/users', {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role
      });
      
      if (addedUser) {
        setUsers([...users, addedUser]);
        setNewUser({ username: '', email: '', password: '', role: 'admin' });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setError(error.response?.data?.msg || 'Failed to add user. Please try again.');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    });
    setShowEditForm(true);
  };

  const handleUpdateUser = async (e) => {
    if (e) e.preventDefault();
    
    try {
      setError(''); // Clear previous error
      const updatedUser = await api.put(`/admin/users/${editingUser.id}`, {
        username: editingUser.username,
        email: editingUser.email,
        role: editingUser.role,
        isActive: editingUser.isActive
      });
      
      if (updatedUser) {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setShowEditForm(false);
        setEditingUser({
          id: '',
          username: '',
          email: '',
          role: 'admin',
          isActive: true
        });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.response?.data?.msg || 'Failed to update user. Please try again.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8`}>Admin Users</h1>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ec2626]"></div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-4`}>Loading admin users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Admin Users</h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manage admin user accounts</p>
      </div>

      {/* Add User Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Admin
        </button>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className={`mb-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Add New Admin User</h2>
          
          {error && (
            <div className={`mb-4 p-3 ${isDark ? 'bg-red-900/30 border-red-700' : 'bg-red-100 border-red-300'} border rounded-lg ${isDark ? 'text-red-300' : 'text-red-800'}`}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Username</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className={`w-full px-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent`}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className={`w-full px-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent`}
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className={`w-full px-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent`}
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className={`w-full px-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent`}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className={`px-4 py-2 ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] text-white rounded-lg hover:opacity-90"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit User Form */}
      {showEditForm && (
        <div className={`mb-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Edit User</h2>
          
          {error && (
            <div className={`mb-4 p-3 ${isDark ? 'bg-red-900/30 border-red-700' : 'bg-red-100 border-red-300'} border rounded-lg ${isDark ? 'text-red-300' : 'text-red-800'}`}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleUpdateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Username</label>
              <input
                type="text"
                value={editingUser.username}
                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                className={`w-full px-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent`}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email</label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className={`w-full px-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent`}
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Role</label>
              <select
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                className={`w-full px-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent`}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Status</label>
              <select
                value={editingUser.isActive ? 'active' : 'inactive'}
                onChange={(e) => setEditingUser({ ...editingUser, isActive: e.target.value === 'active' })}
                className={`w-full px-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent`}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowEditForm(false);
                  setEditingUser({
                    id: '',
                    username: '',
                    email: '',
                    role: 'admin',
                    isActive: true
                  });
                }}
                className={`px-4 py-2 ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] text-white rounded-lg hover:opacity-90"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className={`border rounded-xl overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <tr>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Username</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Email</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Role</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Status</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Date Added</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={`${isDark ? 'border-t border-gray-700 hover:bg-gray-700/30' : 'border-t border-gray-200 hover:bg-gray-50'}`}>
                <td className={`py-3 px-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user.username}
                </td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user.email}
                </td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user.role}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatDate(user.createdAt)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="action-btn"
                      title="Edit User"
                      aria-label="Edit User"
                      style={{ backgroundColor: 'rgba(16,185,129,0.12)', color: '#10b981' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"></path></svg>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="action-btn"
                      title="Delete User"
                      aria-label="Delete User"
                      style={{ backgroundColor: 'rgba(239,68,68,0.12)', color: '#ef4444' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;