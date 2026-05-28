import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Cpu } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cyber-black text-white gap-4">
        {/* Glowing loader */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-neon-cyan/20 border-t-neon-cyan rounded-full animate-spin shadow-lg shadow-neon-cyan/20" />
          <Cpu className="absolute w-6 h-6 text-neon-cyan animate-pulse" />
        </div>
        <p className="font-orbitron font-bold text-xs text-neon-cyan tracking-widest uppercase animate-pulse">
          Verifying Identity...
        </p>
      </div>
    );
  }

  if (!token) {
    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
