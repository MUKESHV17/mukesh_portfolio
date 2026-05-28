import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, CheckCircle } from 'lucide-react';

const ProjectModal = ({ isOpen, project, onClose }) => {
  if (!isOpen || !project) return null;

  const { title, description, longDescription, techStack, githubLink, liveLink, image } = project;

  // Simple parser to extract potential features or highlights from descriptions or generate bullet placeholders
  const features = project.features || [
    "Integrated high-speed RESTful JSON application programming interfaces.",
    "Engineered reactive visual components with custom viewport slide transformations.",
    "Formulated robust system architectures targeting strict production specifications.",
    "Optimized data processing layers ensuring low latency database CRUD queries."
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-x-hidden overflow-y-auto">
        {/* Backdrop blurred overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-cyber-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#06021f]/95 backdrop-blur-2xl shadow-2xl shadow-neon-cyan/15 overflow-hidden z-10 flex flex-col my-8"
        >
          {/* Close Button top-right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full border border-white/10 bg-cyber-black/60 hover:border-neon-magenta hover:text-neon-magenta text-gray-400 transition-colors duration-300 cursor-pointer"
            aria-label="Close details dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Graphic Image */}
          <div className="relative w-full h-64 md:h-72 overflow-hidden bg-space-dark/50">
            <div className="absolute inset-0 bg-gradient-to-t from-[#06021f] via-transparent to-transparent z-10" />
            <img
              src={image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"}
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Overlay Title badge */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <span className="px-3 py-1 text-[10px] font-bold font-orbitron uppercase tracking-widest bg-neon-cyan/20 border border-neon-cyan text-neon-cyan rounded-full shadow-neon-cyan/25 flex items-center gap-1.5 w-fit mb-2">
                <Cpu className="w-3.5 h-3.5" /> Project Showcase
              </span>
              <h2 className="text-2xl md:text-3xl font-black font-orbitron text-white text-shadow-glow">
                {title}
              </h2>
            </div>
          </div>

          {/* Content Pane */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-320px)] flex flex-col gap-6">
            
            {/* Long Technical overview */}
            <div>
              <h3 className="text-xs font-bold font-orbitron text-neon-magenta uppercase tracking-widest mb-2">
                Technical Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base font-sans">
                {longDescription || description}
              </p>
            </div>

            {/* Core Features bullets */}
            <div>
              <h3 className="text-xs font-bold font-orbitron text-neon-green uppercase tracking-widest mb-3">
                Key Deliverables & Benchmarks
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
                {(features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack badging */}
            <div>
              <h3 className="text-xs font-bold font-orbitron text-neon-cyan uppercase tracking-widest mb-3">
                Engineering Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(techStack || []).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-semibold rounded-lg border border-neon-cyan/25 bg-neon-cyan/5 text-neon-cyan"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Link strip */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-4">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-neon-cyan hover:text-neon-cyan bg-white/5 hover:bg-neon-cyan/5 text-sm font-semibold transition-all duration-300 text-gray-300"
                >
                  <Github className="w-4.5 h-4.5" /> Source Repository
                </a>
              )}
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-neon-magenta hover:text-neon-magenta bg-white/5 hover:bg-neon-magenta/5 text-sm font-semibold transition-all duration-300 text-gray-300"
                >
                  <ExternalLink className="w-4.5 h-4.5" /> Open Application
                </a>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
