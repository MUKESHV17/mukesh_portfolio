import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Cpu } from 'lucide-react';

const ProjectCard = ({ project, onOpenDetails }) => {
  const { title, description, techStack, githubLink, liveLink, image } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col h-full rounded-2xl border border-white/10 bg-cyber-black/40 backdrop-blur-xl overflow-hidden hover:border-neon-cyan/50 transition-all duration-300 shadow-lg hover:shadow-neon-cyan/10"
    >
      {/* Glow border overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Banner */}
      <div className="relative w-full h-48 overflow-hidden bg-space-dark/40">
        <div className="absolute inset-0 bg-cyber-black/25 z-10" />
        <img
          src={image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Glow badge overlay */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 text-[10px] font-bold font-orbitron uppercase tracking-widest bg-cyber-black/85 backdrop-blur-md rounded-full border border-neon-cyan text-neon-cyan shadow-neon-cyan/30 flex items-center gap-1">
          <Cpu className="w-3 h-3" /> Core Asset
        </div>
      </div>

      {/* Card Body content */}
      <div className="flex flex-col flex-grow p-6 z-20">
        <h3 className="text-xl font-bold font-orbitron text-white group-hover:text-neon-cyan transition-colors duration-300 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-400 font-sans leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {(techStack || []).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 text-xs font-semibold rounded-md border border-white/5 bg-white/5 text-gray-300 hover:border-neon-cyan/30 hover:text-neon-cyan transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/10 hover:border-neon-cyan hover:text-neon-cyan bg-white/5 hover:bg-neon-cyan/5 transition-all duration-300 text-gray-400"
                title="View Codebase Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/10 hover:border-neon-magenta hover:text-neon-magenta bg-white/5 hover:bg-neon-magenta/5 transition-all duration-300 text-gray-400"
                title="Open Live Application"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <button
            onClick={onOpenDetails}
            className="px-4 py-1.5 text-xs font-bold font-orbitron rounded-lg border border-neon-cyan bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan hover:text-cyber-black transition-all duration-300 shadow-neon-cyan/10 hover:shadow-neon-cyan/40 cursor-pointer"
          >
            DETAILS
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
