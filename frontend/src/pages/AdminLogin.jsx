import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, User, KeyRound, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard automatically
  useEffect(() => {
    if (token) {
      navigate('/admin');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(username, password);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Identity authentication failed.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cyber-black flex flex-col items-center justify-center p-6 cyber-grid overflow-hidden">
      
      {/* Backing Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-neon-magenta/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Return home link */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-black font-orbitron text-gray-500 hover:text-neon-cyan transition-colors duration-300 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> RETURN TO PORTFOLIO
      </motion.button>

      {/* Login Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#05011c]/90 backdrop-blur-2xl p-8 shadow-2xl shadow-neon-magenta/10 text-center z-10"
      >
        {/* Glow accent corner */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-neon-magenta/5 to-transparent rounded-tl-2xl pointer-events-none" />

        {/* Lock Shield Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-neon-magenta/10 border border-neon-magenta/35 flex items-center justify-center text-neon-magenta shadow-neon-magenta/20 mb-6 animate-pulse">
          <Lock className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-black font-orbitron text-white leading-tight mb-1">
          Secure Authorization
        </h1>
        <p className="text-[10px] font-bold font-orbitron tracking-widest text-gray-500 uppercase mb-8">
          IDENTITY VERIFICATION GATEWAY
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
          
          {/* Username Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs font-bold font-orbitron text-gray-400 uppercase flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-neon-magenta" /> Username Code
            </label>
            <input
              type="text"
              id="username"
              required
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="cyber-input"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-bold font-orbitron text-gray-400 uppercase flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-neon-magenta" /> Access Cypher
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cyber-input"
            />
          </div>

          {/* Error Alert Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg border border-neon-magenta/40 bg-neon-magenta/10 text-neon-magenta text-xs font-semibold text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl border border-neon-magenta bg-neon-magenta/10 text-neon-magenta hover:bg-neon-magenta hover:text-white transition-all duration-300 font-orbitron font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-neon-magenta/10 hover:shadow-neon-magenta/45 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'COMPUTING KEYS...' : 'AUTHORIZE ACCESS'}
            <ShieldCheck className="w-4.5 h-4.5" />
          </button>

        </form>

        {/* Dynamic terminal logging overlay for effect */}
        <div className="mt-8 pt-6 border-t border-white/5 text-[9px] font-mono text-gray-600 flex flex-col gap-1 text-left select-none leading-none">
          <span>PORT: 5000 // IP: DEVIATED</span>
          <span>SSH VERIFICATION ACTIVE</span>
          <span>AUTOSEED SECURE STATUS: OK</span>
        </div>

      </motion.div>

    </div>
  );
};

export default AdminLogin;
