import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  // Set default API authorization headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('adminToken', token);
      verifyToken();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('adminToken');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  // Verify token against server on load
  const verifyToken = async () => {
    const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
    try {
      const res = await axios.get(`${apiBase}/api/auth/verify`);
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.error('Session Verification Failed:', err.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Perform secure login
  const login = async (username, password) => {
    const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
    try {
      const res = await axios.post(`${apiBase}/api/auth/login`, { username, password });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, error: 'Login verification failed' };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Server connection error';
      return { success: false, error: errorMsg };
    }
  };

  // Terminate login session
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('adminToken');
    setLoading(false);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContext;
