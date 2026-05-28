import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Layout, Server, Database, Brain, Settings } from 'lucide-react';

const SkillCard = ({ skill, index }) => {
  const { name, category, level } = skill;

  // Category Icon Resolver
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Languages': return <Terminal className="w-5 h-5" />;
      case 'Frontend': return <Layout className="w-5 h-5" />;
      case 'Backend': return <Server className="w-5 h-5" />;
      case 'Databases': return <Database className="w-5 h-5" />;
      case 'AI/ML': return <Brain className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  // Category Theme Colors mapping
  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'Languages': return {
        text: 'text-neon-cyan',
        border: 'group-hover:border-neon-cyan/50',
        bg: 'bg-neon-cyan/5',
        bar: 'bg-neon-cyan shadow-neon-cyan/50',
        shadow: 'hover:shadow-neon-cyan/10'
      };
      case 'Frontend': return {
        text: 'text-neon-magenta',
        border: 'group-hover:border-neon-magenta/50',
        bg: 'bg-neon-magenta/5',
        bar: 'bg-neon-magenta shadow-neon-magenta/50',
        shadow: 'hover:shadow-neon-magenta/10'
      };
      case 'Backend': return {
        text: 'text-neon-blue',
        border: 'group-hover:border-neon-blue/50',
        bg: 'bg-neon-blue/5',
        bar: 'bg-neon-blue shadow-neon-blue/50',
        shadow: 'hover:shadow-neon-blue/10'
      };
      case 'Databases': return {
        text: 'text-yellow-400',
        border: 'group-hover:border-yellow-400/50',
        bg: 'bg-yellow-400/5',
        bar: 'bg-yellow-400 shadow-yellow-400/50',
        shadow: 'hover:shadow-yellow-400/10'
      };
      case 'AI/ML': return {
        text: 'text-neon-green',
        border: 'group-hover:border-neon-green/50',
        bg: 'bg-neon-green/5',
        bar: 'bg-neon-green shadow-neon-green/50',
        shadow: 'hover:shadow-neon-green/10'
      };
      default: return {
        text: 'text-purple-400',
        border: 'group-hover:border-purple-400/50',
        bg: 'bg-purple-400/5',
        bar: 'bg-purple-400 shadow-purple-400/50',
        shadow: 'hover:shadow-purple-400/10'
      };
    }
  };

  const getLevelPercent = (lvl) => {
    switch (lvl) {
      case 'Advanced': return '95%';
      case 'Intermediate': return '75%';
      default: return '45%'; // Beginner
    };
  };

  const theme = getCategoryTheme(category);
  const percent = getLevelPercent(level);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className={`group relative p-5 rounded-xl border border-white/5 bg-cyber-black/40 backdrop-blur-xl ${theme.border} ${theme.shadow} transition-all duration-300 flex flex-col gap-4 overflow-hidden`}
    >
      {/* Light radial accent glow */}
      <div className={`absolute -right-12 -top-12 w-24 h-24 rounded-full ${theme.bg} opacity-0 group-hover:opacity-100 filter blur-2xl transition-opacity duration-300 pointer-events-none`} />

      {/* Card Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg bg-white/5 border border-white/10 ${theme.text} transition-colors duration-300`}>
            {getCategoryIcon(category)}
          </div>
          <span className="font-bold text-white font-rajdhani text-lg group-hover:text-white transition-colors duration-300">
            {name}
          </span>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded border border-white/5 bg-white/5 text-gray-400 ${theme.text}`}>
          {level}
        </span>
      </div>

      {/* Progress Bar indicator */}
      <div className="flex flex-col gap-1.5 mt-2">
        <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold font-orbitron uppercase">
          <span>CAPACITY LEVEL</span>
          <span>{percent}</span>
        </div>
        {/* Track */}
        <div className="w-full h-1.5 bg-cyber-black border border-white/5 rounded-full overflow-hidden">
          {/* Fill */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: percent }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className={`h-full rounded-full ${theme.bar}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
