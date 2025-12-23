const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Function to make authenticated API requests
const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token || '',
      },
    });
    
    return handleResponse(response);
  },
  
  post: async (endpoint, data) => {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token || '',
      },
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  },
  
  put: async (endpoint, data) => {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token || '',
      },
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  },
  
  delete: async (endpoint) => {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token || '',
      },
    });
    
    return handleResponse(response);
  },
};

// Function to handle response
const handleResponse = async (response) => {
  if (response.status === 401) {
    // Token might be expired, redirect to login
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
    return null;
  }
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.msg || 'Request failed');
  }
  
  return data;
};

export default api;