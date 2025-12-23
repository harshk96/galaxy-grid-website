import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin'
  });

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
        <h1 className="text-3xl font-bold text-white mb-8">Admin Users</h1>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ec2626]"></div>
          <p className="text-gray-400 mt-4">Loading admin users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Users</h1>
        <p className="text-gray-400">Manage admin user accounts</p>
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
        <div className="mb-6 bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Add New Admin User</h2>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
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

      {/* Users Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Username</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Email</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Role</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Date Added</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-700/30">
                  <td className="py-3 px-4 text-white">{user.username}</td>
                  <td className="py-3 px-4 text-gray-300">{user.email}</td>
                  <td className="py-3 px-4 text-gray-300">{user.role}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      user.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{formatDate(user.createdAt)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-400">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <i className="fas fa-trash"></i>
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