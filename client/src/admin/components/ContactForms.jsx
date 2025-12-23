import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const ContactForms = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Fetch contact forms from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await api.get('/contacts');
        if (data) {
          // If the API returns paginated data, use the contacts array
          setContacts(data.contacts || data);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'new':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-500';
      case 'resolved':
        return 'bg-green-500/20 text-green-500';
      case 'closed':
        return 'bg-gray-500/20 text-gray-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-green-500/20 text-green-500';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'high':
        return 'bg-orange-500/20 text-orange-500';
      case 'urgent':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Contact Forms</h1>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ec2626]"></div>
          <p className="text-gray-400 mt-4">Loading contact forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Contact Forms</h1>
        <p className="text-gray-400">Manage all contact form submissions</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Contact Forms Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Name</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Email</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Project Type</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Priority</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Date</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id || contact.id} className="border-t border-gray-700 hover:bg-gray-700/30">
                  <td className="py-3 px-4 text-white">{contact.name}</td>
                  <td className="py-3 px-4 text-gray-300">{contact.email}</td>
                  <td className="py-3 px-4 text-gray-300">{contact.projectType}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusClass(contact.status)}`}>
                      {contact.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getPriorityClass(contact.priority)}`}>
                      {contact.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{formatDate(contact.createdAt)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-400">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="text-green-500 hover:text-green-400">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="text-red-500 hover:text-red-400">
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

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-400">Showing 1-4 of 4</p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Previous</button>
          <button className="px-3 py-1 bg-[#ec2626] text-white rounded">1</button>
          <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ContactForms;