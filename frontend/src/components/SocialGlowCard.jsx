import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Code2, ShieldAlert, Award, Hash } from 'lucide-react';

const SocialGlowCard = ({ platform, username, url, index }) => {
  // Brand color mappings
  const getBrandDetails = (plat) => {
    switch (plat) {
      case 'GitHub': return {
        color: '#ffffff',
        border: 'hover:border-white/60',
        bg: 'hover:bg-white/5',
        shadow: 'hover:shadow-white/10',
        icon: <Github className="w-8 h-8 text-white" />,
        stat: '18+ Repositories'
      };
      case 'LinkedIn': return {
        color: '#0077b5',
        border: 'hover:border-blue-500/60',
        bg: 'hover:bg-blue-500/5',
        shadow: 'hover:shadow-blue-500/10',
        icon: <Linkedin className="w-8 h-8 text-[#0077b5]" />,
        stat: 'Connections'
      };
      case 'LeetCode': return {
        color: '#ffa116',
        border: 'hover:border-orange-500/60',
        bg: 'hover:bg-orange-500/5',
        shadow: 'hover:shadow-orange-500/10',
        icon: <Code2 className="w-8 h-8 text-[#ffa116]" />,
        stat: '500+ Solved'
      };
      case 'CodeChef': return {
        color: '#5b4636',
        border: 'hover:border-amber-700/60',
        bg: 'hover:bg-amber-700/5',
        shadow: 'hover:shadow-amber-700/10',
        icon: <Award className="w-8 h-8 text-[#a07a5d]" />,
        stat: '3-Star Coder'
      };
      case 'Codeforces': return {
        color: '#1f8ac6',
        border: 'hover:border-cyan-600/60',
        bg: 'hover:bg-cyan-600/5',
        shadow: 'hover:shadow-cyan-600/10',
        icon: <Hash className="w-8 h-8 text-[#1f8ac6]" />,
        stat: '1200+ Rating'
      };
      case 'GeeksforGeeks': return {
        color: '#2f8d46',
        border: 'hover:border-green-600/60',
        bg: 'hover:bg-green-600/5',
        shadow: 'hover:shadow-green-600/10',
        icon: <Code2 className="w-8 h-8 text-[#2f8d46]" />,
        stat: 'Ranked'
      };
      default: return {
        color: '#00f5ff',
        border: 'hover:border-neon-cyan/60',
        bg: 'hover:bg-neon-cyan/5',
        shadow: 'hover:shadow-neon-cyan/10',
        icon: <Code2 className="w-8 h-8 text-neon-cyan" />,
        stat: 'Verified'
      };
    }
  };

  const brand = getBrandDetails(platform);

  return (
    <motion.a
      href={url || '#'}
      target={url ? '_blank' : '_self'}
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={`glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all duration-300 ${brand.border} ${brand.bg} ${brand.shadow}`}
    >
      {/* Brand Icon wrapper */}
      <div className="p-4 rounded-full bg-cyber-black border border-white/10 group-hover:border-transparent transition-colors duration-300 shadow-md">
        {brand.icon}
      </div>

      {/* Brand details */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-black font-orbitron text-white">
          {platform}
        </h3>
        <span className="text-[10px] font-bold font-orbitron uppercase tracking-widest text-gray-500">
          {brand.stat}
        </span>
      </div>

      <span className="text-xs text-neon-cyan opacity-80 hover:opacity-100 font-sans tracking-wide truncate max-w-[150px]">
        {username || 'View Profile'}
      </span>
    </motion.a>
  );
};

export default SocialGlowCard;
