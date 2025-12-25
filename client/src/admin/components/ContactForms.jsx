import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const ContactForms = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingContact, setEditingContact] = useState({
    status: '',
    priority: ''
  });
  const { isDark } = useTheme();
  
  // Filter contacts based on search and filter criteria
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = search === '' || 
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.projectType.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === 'all' || contact.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  // View contact function
  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  };

  // Prepare to edit contact
  const handleEditContact = (contact) => {
    setEditingContact({
      id: contact._id || contact.id,
      status: contact.status,
      priority: contact.priority
    });
    setShowEditModal(true);
  };

  // Update contact status
  const handleUpdateContact = async () => {
    try {
      const response = await api.put(`/admin/contacts/${editingContact.id}/status`, {
        status: editingContact.status
      });
      
      // Update priority if changed
      if (response && response.priority !== editingContact.priority) {
        await api.put(`/admin/contacts/${editingContact.id}/priority`, {
          priority: editingContact.priority
        });
      }
      
      // Refresh the contact list
      const data = await api.get('/admin/contacts');
      setContacts(data.contacts || data);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  // Delete contact function
  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact? This will soft delete the contact.')) {
      try {
        await api.delete(`/admin/contacts/${id}`);
        // Refresh the contact list
        const data = await api.get('/admin/contacts');
        setContacts(data.contacts || data);
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  // Fetch contact forms from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await api.get('/admin/contacts');
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
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8`}>Contact Forms</h1>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ec2626]"></div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-4`}>Loading contact forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Forms</h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manage all contact form submissions</p>
      </div>

        {/* Filters */}
        <div className="mb-6 filters-row flex flex-col md:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'}`}>
              <svg className="text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`search-input flex-1 py-2 ${isDark ? 'bg-transparent text-white placeholder-gray-400' : 'bg-transparent text-gray-900 placeholder-gray-500'} focus:outline-none`}
            />
            </div>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`select-control px-3 py-2 ${isDark ? 'bg-gray-800 border border-gray-700 text-white' : 'bg-white border border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626]`}
          >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Contact Forms Table */}
      <div className={`border rounded-xl overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <tr>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Name</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Email</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Project Type</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Status</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Priority</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Date</th>
                <th className={`text-left py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact._id || contact.id} className={`${isDark ? 'border-t border-gray-700 hover:bg-gray-700/30' : 'border-t border-gray-200 hover:bg-gray-50'}`}>
                  <td className={`py-3 px-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {contact.name}
                  </td>
                  <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {contact.email}
                  </td>
                  <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {contact.projectType}
                  </td>
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
                  <td className={`py-3 px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatDate(contact.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="action-btn"
                        title="View Contact"
                        aria-label="View Contact"
                        style={{ backgroundColor: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button
                        onClick={() => handleEditContact(contact)}
                        className="action-btn"
                        title="Edit Contact"
                        aria-label="Edit Contact"
                        style={{ backgroundColor: 'rgba(16,185,129,0.12)', color: '#10b981' }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"></path></svg>
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact._id || contact.id)}
                        className="action-btn"
                        title="Delete Contact"
                        aria-label="Delete Contact"
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

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Showing 1-{filteredContacts.length} of {filteredContacts.length}</p>
        <div className="flex space-x-2">
          <button className={`px-3 py-1 rounded ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Previous</button>
          <button className="px-3 py-1 bg-[#ec2626] text-white rounded">1</button>
          <button className={`px-3 py-1 rounded ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Next</button>
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
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusClass(selectedContact.status)}`}>
                  {selectedContact.status.replace('-', ' ')}
                </span>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Priority</p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${getPriorityClass(selectedContact.priority)}`}>
                  {selectedContact.priority}
                </span>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Message</p>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedContact.message}</p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Date</p>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedContact.createdAt)}</p>
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

      {/* Edit Contact Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Edit Contact</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className={`text-lg ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Status</label>
                <select
                  value={editingContact.status}
                  onChange={(e) => setEditingContact({...editingContact, status: e.target.value})}
                  className={`w-full px-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent`}
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Priority</label>
                <select
                  value={editingContact.priority}
                  onChange={(e) => setEditingContact({...editingContact, priority: e.target.value})}
                  className={`w-full px-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec2626] focus:border-transparent`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateContact}
                className="px-4 py-2 bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] text-white rounded-lg hover:opacity-90"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForms;