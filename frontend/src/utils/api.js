import axios from 'axios';

// Resolve base API endpoint (localhost in development, Render URL in production)
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : (import.meta.env.VITE_API_URL || '');

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auto-inject JWT token into outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
