import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShieldAlert, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const navigate = useNavigate();
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  // Toggle scroll background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect current visible section on scroll
      if (isMainPage) {
        const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMainPage]);

  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Experience', target: 'experience' },
    { label: 'Projects', target: 'projects' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleNavClick = (target) => {
    setIsOpen(false);
    
    if (!isMainPage) {
      // If we are on admin/login, navigate back to main page and scroll to section after mount
      navigate('/', { state: { scrollTo: target } });
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(target);
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-cyber-black/75 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-neon-cyan/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Branding Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-black tracking-wide"
        >
          <span
            onClick={() => handleNavClick('home')}
            className="cursor-pointer font-orbitron hover:opacity-85 text-white"
          >
            Mukesh<span className="text-neon-magenta">V.</span>
          </span>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 font-rajdhani font-semibold text-lg text-gray-300">
            {navLinks.map((link) => (
              <li key={link.target} className="relative py-1">
                <button
                  onClick={() => handleNavClick(link.target)}
                  className={`hover:text-neon-cyan transition-colors cursor-pointer duration-300 ${
                    activeSection === link.target && isMainPage ? 'text-neon-cyan' : ''
                  }`}
                >
                  {link.label}
                </button>
                {/* Neon bottom underline indicator */}
                {activeSection === link.target && isMainPage && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-cyan shadow-neon-cyan"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Glowing Admin Gateway Anchor */}
          <RouterLink
            to="/admin"
            className="flex items-center gap-1.5 p-2 rounded-lg border border-neon-magenta/30 bg-neon-magenta/5 text-neon-magenta hover:bg-neon-magenta hover:text-white transition-all duration-300 shadow-neon-magenta/10 hover:shadow-neon-magenta/40"
            title="Admin Access Gateway"
          >
            <Laptop className="w-4 h-4" />
            <span className="font-orbitron text-xs font-bold">PORTAL</span>
          </RouterLink>
        </div>

        {/* Mobile Hamburger Toggle Menu */}
        <div className="md:hidden flex items-center gap-4">
          <RouterLink
            to="/admin"
            className="p-1.5 rounded-lg border border-neon-magenta/30 text-neon-magenta"
            title="Admin Portal"
          >
            <Laptop className="w-4 h-4" />
          </RouterLink>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-neon-cyan focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Tray */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full bg-cyber-black/95 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-4 font-rajdhani font-semibold text-xl">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => handleNavClick(link.target)}
                  className={`text-left py-2 hover:text-neon-cyan transition-colors cursor-pointer border-b border-white/5 ${
                    activeSection === link.target && isMainPage ? 'text-neon-cyan' : 'text-gray-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
