import React from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: 'https://github.com/MUKESHV17', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/in/mukesh-v-1027b0293', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, url: 'mailto:mukesh631701@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="relative bg-[#030012] border-t border-white/10 pt-16 pb-8 overflow-hidden">
      {/* Decorative radial glows */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-neon-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-neon-magenta/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Branding Column */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-black font-orbitron tracking-wide text-white">
            Mukesh<span className="text-neon-cyan">V.</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Computer Science Engineering student at SKCET specializing in high-efficiency full-stack architectures, real-time computer vision networks, and AI pipelines.
          </p>
          {/* Social Icons row */}
          <div className="flex items-center gap-4 mt-2">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan hover:shadow-neon-cyan/20 transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-orbitron font-bold text-base text-neon-magenta tracking-wide uppercase">
            Navigation Map
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400 font-rajdhani font-semibold text-lg">
            <li>
              <button onClick={() => handleScrollTo('home')} className="hover:text-neon-cyan transition-colors duration-200 cursor-pointer">
                Home Base
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo('about')} className="hover:text-neon-cyan transition-colors duration-200 cursor-pointer">
                About Bio
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo('skills')} className="hover:text-neon-cyan transition-colors duration-200 cursor-pointer">
                Skills Stack
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo('experience')} className="hover:text-neon-cyan transition-colors duration-200 cursor-pointer">
                Timeline
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo('projects')} className="hover:text-neon-cyan transition-colors duration-200 cursor-pointer">
                Project Vault
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo('contact')} className="hover:text-neon-cyan transition-colors duration-200 cursor-pointer">
                Contact Gate
              </button>
            </li>
          </ul>
        </div>

        {/* Dynamic Accolade Status Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-orbitron font-bold text-base text-neon-green tracking-wide uppercase">
            Active Focus
          </h3>
          <div className="p-4 rounded-xl border border-white/5 bg-white/2 hover:border-neon-green/30 transition-colors duration-300">
            <div className="flex items-center justify-between text-xs text-gray-400 font-bold mb-2">
              <span>SYSTEM LOAD</span>
              <span className="text-neon-green animate-pulse">OPTIMIZED</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Actively seeking software engineering and full-stack developer internships starting Fall 2026. Equipped with high-level DSA skills (500+ solved problems) and cloud architectures.
            </p>
          </div>
        </div>
      </div>

      {/* Underbar copyright and info */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <span>
          &copy; {currentYear} Mukesh V. Engineered with React + Node.js + MongoDB.
        </span>
        <div className="flex gap-4">
          <a
            href="https://github.com/MUKESHV17"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-neon-cyan"
          >
            Source Code <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
