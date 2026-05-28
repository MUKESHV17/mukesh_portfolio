import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import confetti from 'canvas-confetti';
import { 
  ArrowRight, Download, Send, GraduationCap, Trophy, Award, 
  Sparkles, Mail, Phone, MapPin, ExternalLink, Cpu, Github 
} from 'lucide-react';

// Shared Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticlesBg from '../components/ParticlesBg';
import ScrollToTop from '../components/ScrollToTop';
import CustomCursor from '../components/CustomCursor';

// Section Components
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import SkillCard from '../components/SkillCard';
import ExpTimeline from '../components/ExpTimeline';
import SocialGlowCard from '../components/SocialGlowCard';

const MainPortfolio = () => {
  const location = useLocation();

  // State Management
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certs, setCerts] = useState([]);
  const [gitStats, setGitStats] = useState(null);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({ success: null, message: '' });

  // Hero Typing Intro loops
  const typingTexts = ["Mukesh V", "Full Stack Developer", "AI/ML Enthusiast", "Competitive Programmer"];
  const [currentTextIdx, setCurrentTextIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll logic for navbar returns
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const target = location.state.scrollTo;
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      // Clean state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Load Portfolio Elements from backend API
  useEffect(() => {
    const fetchData = async () => {
      const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:5000' : (import.meta.env.VITE_API_URL || '');
      
      try {
        // Projects
        const projectsRes = await axios.get(`${apiBase}/api/projects`);
        if (projectsRes.data.success) setProjects(projectsRes.data.data);
      } catch (e) {
        console.warn('Projects API offline, using local seed fallback.');
        setProjects([
          {
            _id: '1',
            title: "AI-ML Integrated Healthcare Risk Management System",
            description: "An advanced, intelligent healthcare risk prediction and report analyzer system featuring Gemini AI and custom ML classification.",
            longDescription: "Developed a comprehensive full-stack medical utility that evaluates patient risk profiles using a Random Forest classification model boasting 93% accuracy. Features full Gemini AI integration to interpret complex medical report PDFs, an empathetic real-time AI conversational chatbot, and a robust PostgreSQL calendar appointment scheduling framework.",
            techStack: ["React.js", "Flask", "PostgreSQL", "Random Forest", "PyPDF", "Gemini AI"],
            githubLink: "https://github.com/MUKESHV17",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
            isFeatured: true
          },
          {
            _id: '2',
            title: "E-Wallet Management System",
            description: "A highly secure digital transaction ledger and electronic wallet system powered by Spring Boot microservices.",
            longDescription: "Engineered a secure financial portal implementing role-based access control, secure JWT-validated authorization, real-time fund transfers, transaction histories, and balance sheets. Structured with a React.js dashboard interface communicating with a Spring Boot enterprise Java backend and a MySQL relational database.",
            techStack: ["React.js", "Spring Boot", "MySQL", "JWT", "REST APIs"],
            githubLink: "https://github.com/MUKESHV17",
            image: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=800&q=80",
            isFeatured: true
          },
          {
            _id: '3',
            title: "Intelligent Traffic Management System",
            description: "Computer Vision driven traffic flow optimizer simulating dynamic smart junction scheduling based on real-time density.",
            longDescription: "Constructed an autonomous traffic flow optimizer utilizing YOLO object detection to classify vehicle types and calculate queue density on multi-junction lanes. Deployed custom TensorFlow scripts that feed real-time density metrics to a dynamic signal switching algorithm, reducing congestion and junction wait times by 23% in Pygame simulated environments.",
            techStack: ["Python", "TensorFlow", "YOLOv8", "Pygame", "OpenCV"],
            githubLink: "https://github.com/MUKESHV17",
            image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80",
            isFeatured: true
          }
        ]);
      }

      try {
        // Skills
        const skillsRes = await axios.get(`${apiBase}/api/skills`);
        if (skillsRes.data.success) setSkills(skillsRes.data.data);
      } catch (e) {
        setSkills([
          { name: "C++", category: "Languages", level: "Advanced" },
          { name: "Java", category: "Languages", level: "Intermediate" },
          { name: "Python", category: "Languages", level: "Advanced" },
          { name: "JavaScript", category: "Languages", level: "Intermediate" },
          { name: "React.js", category: "Frontend", level: "Intermediate" },
          { name: "HTML5", category: "Frontend", level: "Advanced" },
          { name: "CSS3", category: "Frontend", level: "Advanced" },
          { name: "Tailwind CSS", category: "Frontend", level: "Advanced" },
          { name: "Node.js", category: "Backend", level: "Intermediate" },
          { name: "Flask", category: "Backend", level: "Intermediate" },
          { name: "Spring Boot", category: "Backend", level: "Intermediate" },
          { name: "Express.js", category: "Backend", level: "Intermediate" },
          { name: "MongoDB", category: "Databases", level: "Intermediate" },
          { name: "PostgreSQL", category: "Databases", level: "Intermediate" },
          { name: "MySQL", category: "Databases", level: "Intermediate" },
          { name: "TensorFlow", category: "AI/ML", level: "Intermediate" },
          { name: "PyTorch", category: "AI/ML", level: "Intermediate" },
          { name: "YOLO (v8)", category: "AI/ML", level: "Advanced" },
          { name: "Scikit-learn", category: "AI/ML", level: "Advanced" },
          { name: "REST APIs", category: "Other", level: "Advanced" },
          { name: "JWT", category: "Other", level: "Advanced" },
          { name: "Git", category: "Other", level: "Advanced" },
          { name: "GitHub", category: "Other", level: "Advanced" }
        ]);
      }

      try {
        // Experience
        const expRes = await axios.get(`${apiBase}/api/exp`);
        if (expRes.data.success) setExperience(expRes.data.data);
      } catch (e) {
        setExperience([
          {
            role: "Computer Vision Intern",
            company: "Octanet Services Pvt. Ltd.",
            duration: "Oct 2025 - Nov 2025",
            description: [
              "Developed a real-time object detection and multi-object tracking pipeline utilizing YOLOv8 and ResNet-50 models.",
              "Built a centralized administrative dashboard using React.js and a Flask RESTful API to present video analytics streams.",
              "Optimized tracking stabilization parameters and detection confidence limits, enhancing tracking stability under occlusions."
            ]
          }
        ]);
      }

      try {
        // Certifications
        const certRes = await axios.get(`${apiBase}/api/certs`);
        if (certRes.data.success) setCerts(certRes.data.data);
      } catch (e) {
        setCerts([
          {
            name: "AWS Cloud Practitioner Essentials",
            issuer: "Amazon Web Services (AWS)",
            date: "2025",
            credentialUrl: "https://drive.google.com/file/d/182EOSjmb-GtHq0I_49OsBOtKUyEdR7Lw/view?usp=sharing"
          },
          {
            name: "Google Cloud Computing Foundations",
            issuer: "Google Cloud",
            date: "2025",
            credentialUrl: "https://drive.google.com/file/d/1biAMI-YzNx1hlp80KdWibeKUcJ0r8fYU/view?usp=sharing"
          },
          {
            name: "Cisco Networking Basics",
            issuer: "Cisco Networking Academy",
            date: "2024",
            credentialUrl: "https://drive.google.com/file/d/1A-d_E5AxcSzUty0lt82kZ7J-Mx_k7AzC/view?usp=sharing"
          },
          {
            name: "Cybersecurity Essentials",
            issuer: "Cisco Networking Academy",
            date: "2024",
            credentialUrl: "https://drive.google.com/file/d/12IBWxBHU-Ay0KQ4ixW60BUHv9pyCM-2/view?usp=sharing"
          }
        ]);
      }

      try {
        // GitHub Stats cached proxy
        const gitRes = await axios.get(`${apiBase}/api/github/profile`);
        if (gitRes.data.success) setGitStats(gitRes.data.data);
      } catch (e) {
        console.warn('GitHub proxy unreachable.');
      }
    };

    fetchData();
  }, []);

  // typing animation effect
  useEffect(() => {
    let timer;
    const activeWord = typingTexts[currentTextIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait on full word
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentTextIdx((prev) => (prev + 1) % typingTexts.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIdx]);

  // Form Field change handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Submit Contact Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus({ success: null, message: '' });

    const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:5000' : (import.meta.env.VITE_API_URL || '');

    try {
      const res = await axios.post(`${apiBase}/api/messages`, formData);
      
      if (res.data.success) {
        setFormStatus({
          success: true,
          message: 'Telemetry received! A confirmation packet has been routed to your inbox.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Pop high-performance confetti on contact success!
        import('canvas-confetti').then((module) => {
          const confetti = module.default;
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#00f5ff', '#ff007f', '#39ff14']
          });
        }).catch((err) => console.warn('Confetti load failed', err));
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Database gateway offline, message log skipped.';
      setFormStatus({
        success: false,
        message: `Failure: ${errorMsg}`
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenDetails = (proj) => {
    setSelectedProject(proj);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-cyber-black text-white overflow-hidden cyber-grid">
      
      {/* 3D Interactive elements */}
      <CustomCursor />
      <ParticlesBg />
      <Navbar />
      <ScrollToTop />

      {/* Decorative backing glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-neon-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-80 right-10 w-[450px] h-[450px] bg-neon-magenta/5 rounded-full filter blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-1/3 w-80 h-80 bg-neon-green/5 rounded-full filter blur-[140px] pointer-events-none" />

      {/* ==========================================
          1. HERO / HOME SECTION
          ========================================== */}
      <section
        id="home"
        className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-20 pt-16"
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 max-w-4xl"
        >
          {/* Welcome status flag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan shadow-neon-cyan/10 text-xs font-black font-orbitron uppercase tracking-widest mx-auto w-fit">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} /> SYSTEM: READY TO ENGAGE
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-orbitron tracking-tight text-white leading-tight">
            Hi, I'm <span className="text-gradient-neon filter drop-shadow-[0_0_10px_rgba(0,245,255,0.2)]">Mukesh V</span>
          </h1>

          {/* Glowing Terminal typing box */}
          <div className="h-10 sm:h-12 flex items-center justify-center font-rajdhani font-bold text-2xl sm:text-4xl text-gray-300">
            <span>{currentText}</span>
            <span className="w-1.5 h-7 sm:h-9 bg-neon-cyan shadow-neon-cyan ml-2 animate-pulse" />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Computer Science student experienced in building scalable full-stack applications and AI-driven computer vision systems using modern engineering pipelines.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <button
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-xl cyber-btn-cyan text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
            >
              VIEW PROJECTS <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-xl cyber-btn-magenta text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
            >
              CONTACT ME <Mail className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/MUKESHV17"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 text-gray-300 text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center transition-all duration-300"
            >
              DOWNLOAD RESUME <Download className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. ABOUT SECTION
          ========================================== */}
      <section id="about" className="relative py-24 px-6 z-20 max-w-6xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text/Overview */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-neon-cyan" />
              <h2 className="text-3xl font-black font-orbitron text-white uppercase tracking-wider">
                About Bio
              </h2>
            </div>
            
            <p className="text-gray-300 leading-relaxed font-sans text-lg text-left">
              Computer Science student experienced in building scalable full-stack and AI-driven systems using modern technologies. Developed production-ready applications and solved 500+ coding problems. Passionate about software engineering, AI systems, and impactful technology solutions.
            </p>

            {/* Academic profile indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl border border-white/5 bg-cyber-black/60 flex items-start gap-3 text-left">
                <GraduationCap className="w-6 h-6 text-neon-cyan mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-orbitron text-xs text-neon-cyan tracking-wider font-bold uppercase">College Details</h4>
                  <p className="text-sm font-semibold text-white mt-1">Sri Krishna College of Engineering & Technology</p>
                  <p className="text-xs text-gray-500">B.E. Computer Science, 2023 - 2027</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-cyber-black/60 flex items-start gap-3 text-left">
                <Trophy className="w-6 h-6 text-neon-magenta mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-orbitron text-xs text-neon-magenta tracking-wider font-bold uppercase">Academics Metric</h4>
                  <p className="text-sm font-semibold text-white mt-1">Current Grade: CGPA 8.03</p>
                  <p className="text-xs text-gray-500">Schooling Score: 89.3% final grade</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Picture with decorative cyberpunk orbiting ring */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Pulsing Backing ring */}
              <div className="absolute inset-0 border border-neon-cyan/25 rounded-full animate-pulse-glow" />
              {/* Spinning outer dashboard */}
              <div className="absolute inset-4 border-2 border-dashed border-neon-magenta/25 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              {/* Photo holder */}
              <div className="w-[82%] h-[82%] rounded-full overflow-hidden border-2 border-white/15 bg-space-dark/40 z-10 p-1">
                <img
                  src="/profile.jpg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://avatars.githubusercontent.com/u/1027b0293?v=4";
                  }}
                  alt="Mukesh V - Student Photo"
                  className="w-full h-full object-cover rounded-full"
                  style={{ objectPosition: 'center 15%' }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          3. SKILLS SECTION
          ========================================== */}
      <section id="skills" className="relative py-24 px-6 z-20 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-2 mb-12 justify-center">
          <span className="w-8 h-[2px] bg-neon-magenta" />
          <h2 className="text-3xl font-black font-orbitron text-white uppercase tracking-wider">
            Technical Stack
          </h2>
          <span className="w-8 h-[2px] bg-neon-magenta" />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(skills || []).map((skill, idx) => (
            <SkillCard key={idx} skill={skill} index={idx} />
          ))}
        </div>
      </section>

      {/* ==========================================
          4. EXPERIENCE SECTION
          ========================================== */}
      <section id="experience" className="relative py-24 px-6 z-20 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-2 mb-12 justify-center">
          <span className="w-8 h-[2px] bg-neon-green" />
          <h2 className="text-3xl font-black font-orbitron text-white uppercase tracking-wider">
            Experience History
          </h2>
          <span className="w-8 h-[2px] bg-neon-green" />
        </div>

        <ExpTimeline experiences={experience} />
      </section>

      {/* ==========================================
          5. PROJECTS SECTION
          ========================================== */}
      <section id="projects" className="relative py-24 px-6 z-20 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-8 h-[2px] bg-neon-cyan" />
          <h2 className="text-3xl font-black font-orbitron text-white uppercase tracking-wider">
            Project Vault
          </h2>
          <span className="w-8 h-[2px] bg-neon-cyan" />
        </div>
        <p className="text-sm text-gray-400 text-center mb-12 max-w-md mx-auto">
          Explore key software releases and algorithmic proof of concepts integrated with full databases and AI.
        </p>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(projects || []).map((proj, idx) => (
            <ProjectCard
              key={proj._id || idx}
              project={proj}
              onOpenDetails={() => handleOpenDetails(proj)}
            />
          ))}
        </div>

        {/* Popup Detail Modal */}
        <ProjectModal
          isOpen={isModalOpen}
          project={selectedProject}
          onClose={() => setIsModalOpen(false)}
        />
      </section>

      {/* ==========================================
          6. ACHIEVEMENTS SECTION & LIVE GITHUB STATS
          ========================================= */}
      <section className="relative py-24 px-6 z-20 max-w-6xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Counters column */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-neon-magenta" />
              <h2 className="text-2xl font-black font-orbitron text-white uppercase tracking-wider">
                Achievements
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-white/5 bg-cyber-black/60 flex flex-col gap-1 text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-neon-cyan/5 rounded-full filter blur-md" />
                <span className="font-orbitron font-black text-3xl sm:text-4xl text-neon-cyan">500+</span>
                <span className="text-[10px] font-bold font-orbitron uppercase text-gray-500 tracking-wider">Problems Solved</span>
                <span className="text-xs text-gray-400 mt-1">Across LeetCode and competitive profiles.</span>
              </div>

              <div className="p-5 rounded-2xl border border-white/5 bg-cyber-black/60 flex flex-col gap-1 text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-neon-magenta/5 rounded-full filter blur-md" />
                <span className="font-orbitron font-black text-3xl sm:text-4xl text-neon-magenta">10+</span>
                <span className="text-[10px] font-bold font-orbitron uppercase text-gray-500 tracking-wider">LeetCode Badges</span>
                <span className="text-xs text-gray-400 mt-1">Awarded for consistency and study plans.</span>
              </div>

              <div className="p-5 rounded-2xl border border-white/5 bg-cyber-black/60 flex flex-col gap-1 text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-neon-green/5 rounded-full filter blur-md" />
                <span className="font-orbitron font-black text-3xl sm:text-4xl text-neon-green">3rd</span>
                <span className="text-[10px] font-bold font-orbitron uppercase text-gray-500 tracking-wider">Place Ideathon</span>
                <span className="text-xs text-gray-400 mt-1">Academics innovation hackathon project.</span>
              </div>

              <div className="p-5 rounded-2xl border border-white/5 bg-cyber-black/60 flex flex-col gap-1 text-left relative overflow-hidden group font-sans">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/5 rounded-full filter blur-md" />
                <span className="font-orbitron font-black text-3xl sm:text-4xl text-yellow-400">Chess</span>
                <span className="text-[10px] font-bold font-orbitron uppercase text-gray-500 tracking-wider">Tournament</span>
                <span className="text-xs text-gray-400 mt-1">Active participant in chess configurations.</span>
              </div>
            </div>
          </div>

          {/* GitHub Live stats card */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="glass-card p-6 rounded-2xl border border-white/10 h-full flex flex-col gap-5 text-left relative overflow-hidden">
              <div className="absolute -right-24 -top-24 w-48 h-48 bg-neon-cyan/5 rounded-full filter blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold font-orbitron text-white text-lg">GitHub Activity Proxy</h3>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest font-orbitron uppercase">LIVE NETWORK Aggregates</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-neon-cyan/15 text-neon-cyan text-[10px] font-bold font-orbitron border border-neon-cyan/30 animate-pulse">CACHED</span>
              </div>

              {/* Stats values */}
              <div className="grid grid-cols-3 gap-4 text-center py-4 bg-cyber-black/40 border border-white/5 rounded-xl">
                <div className="flex flex-col gap-0.5">
                  <span className="font-orbitron font-black text-2xl text-white">{gitStats?.profile?.publicRepos || 18}</span>
                  <span className="text-[9px] font-bold font-orbitron text-gray-500 uppercase tracking-widest">Repositories</span>
                </div>
                <div className="flex flex-col gap-0.5 border-x border-white/5">
                  <span className="font-orbitron font-black text-2xl text-white">{gitStats?.profile?.followers || 12}</span>
                  <span className="text-[9px] font-bold font-orbitron text-gray-500 uppercase tracking-widest">Followers</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-orbitron font-black text-2xl text-white">100+</span>
                  <span className="text-[9px] font-bold font-orbitron text-gray-500 uppercase tracking-widest">Contributions</span>
                </div>
              </div>

              {/* List of active repositories fetched from cached endpoint */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold font-orbitron text-neon-cyan uppercase tracking-widest">Recently Pushed Repositories</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {(gitStats?.repos || [
                    { name: 'healthcare-risk-system', language: 'Python', stars: 3 },
                    { name: 'ewallet-management-system', language: 'Java', stars: 2 },
                    { name: 'intelligent-traffic-management', language: 'Python', stars: 5 },
                    { name: 'portfolio_Website', language: 'HTML', stars: 1 }
                  ]).slice(0, 4).map((repo, index) => (
                    <a
                      key={index}
                      href={repo.url || "https://github.com/MUKESHV17"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg border border-white/5 bg-white/2 hover:border-neon-cyan/40 hover:bg-neon-cyan/5 transition-all duration-200 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span className="truncate max-w-[150px] font-rajdhani text-sm">{repo.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold font-orbitron">
                        <span className="uppercase">{repo.language || 'Codebase'}</span>
                        <span className="text-neon-cyan">★ {repo.stars || 0}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          7. CODING PROFILES SECTION
          ========================================== */}
      <section className="relative py-24 px-6 z-20 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-2 mb-12 justify-center">
          <span className="w-8 h-[2px] bg-neon-cyan" />
          <h2 className="text-3xl font-black font-orbitron text-white uppercase tracking-wider">
            Coding Profiles
          </h2>
          <span className="w-8 h-[2px] bg-neon-cyan" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <SocialGlowCard platform="GitHub" username="@MUKESHV17" url="https://github.com/MUKESHV17" index={0} />
          <SocialGlowCard platform="LinkedIn" username="in/mukesh-v" url="https://linkedin.com/in/mukesh-v-1027b0293" index={1} />
          <SocialGlowCard platform="LeetCode" username="@MUKESH_V17" url="https://leetcode.com/u/MUKESH_V17/" index={2} />
          <SocialGlowCard platform="CodeChef" username="@mukesh_v17" url="https://www.codechef.com/users/mukesh_v17" index={3} />
          <SocialGlowCard platform="Codeforces" username="@Mukesh_17" url="https://codeforces.com/profile/Mukesh_17" index={4} />
          <SocialGlowCard platform="GeeksforGeeks" username="@727723ec641" url="https://www.geeksforgeeks.org/profile/727723ec641?tab=activity" index={5} />
        </div>
      </section>

      {/* ==========================================
          8. CERTIFICATIONS SECTION
          ========================================== */}
      <section className="relative py-24 px-6 z-20 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-2 mb-12 justify-center">
          <span className="w-8 h-[2px] bg-neon-magenta" />
          <h2 className="text-3xl font-black font-orbitron text-white uppercase tracking-wider">
            Verified Certifications
          </h2>
          <span className="w-8 h-[2px] bg-neon-magenta" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(certs || []).map((cert, index) => (
            <motion.div
              key={cert._id || index}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass-card p-5 rounded-2xl border border-white/5 text-left flex flex-col gap-4 relative overflow-hidden group hover:border-neon-magenta/40 hover:shadow-neon-magenta/5"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neon-magenta/5 to-transparent rounded-tr-2xl pointer-events-none" />
              
              <div className="p-3 w-fit rounded-lg bg-neon-magenta/10 border border-neon-magenta/35 text-neon-magenta shadow-md">
                <Award className="w-5 h-5" />
              </div>

              <div className="flex flex-col gap-1 flex-grow">
                <h3 className="font-bold font-orbitron text-white leading-snug group-hover:text-neon-magenta transition-colors duration-300">
                  {cert.name}
                </h3>
                <span className="text-sm font-semibold font-rajdhani text-gray-400">
                  {cert.issuer}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2 text-[10px] font-bold font-orbitron text-gray-500">
                <span>YEAR: {cert.date}</span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-magenta hover:underline flex items-center gap-1 uppercase"
                  >
                    Verify <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==========================================
          9. CONTACT SECTION
          ========================================== */}
      <section id="contact" className="relative py-24 px-6 z-20 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-8 h-[2px] bg-neon-cyan" />
          <h2 className="text-3xl font-black font-orbitron text-white uppercase tracking-wider">
            Get In Touch
          </h2>
          <span className="w-8 h-[2px] bg-neon-cyan" />
        </div>
        <p className="text-sm text-gray-400 text-center mb-16 max-w-md mx-auto">
          Establish contact for internships, full-time opportunities, or collaborative development.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Information cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold font-orbitron text-white">Connecting Coordinates</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                I am responsive to e-mail networks and LinkedIn requests. Leave a message, and my notification queue will alert me instantly.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Email link card */}
              <a
                href="mailto:mukesh631701@gmail.com"
                className="p-4 rounded-xl border border-white/5 bg-cyber-black/60 hover:border-neon-cyan/40 transition-colors duration-300 flex items-center gap-4 group"
              >
                <div className="p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/35 text-neon-cyan group-hover:bg-neon-cyan group-hover:text-cyber-black transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold font-orbitron text-gray-500 uppercase tracking-widest">Email Network</h4>
                  <p className="text-sm font-semibold text-white mt-0.5 truncate max-w-[200px] sm:max-w-xs">mukesh631701@gmail.com</p>
                </div>
              </a>

              {/* Phone link card */}
              <a
                href="tel:+916374688075"
                className="p-4 rounded-xl border border-white/5 bg-cyber-black/60 hover:border-neon-cyan/40 transition-colors duration-300 flex items-center gap-4 group"
              >
                <div className="p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/35 text-neon-cyan group-hover:bg-neon-cyan group-hover:text-cyber-black transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold font-orbitron text-gray-500 uppercase tracking-widest">Call Coordinate</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">+91 63746 88075</p>
                </div>
              </a>

              {/* Map pin card */}
              <div className="p-4 rounded-xl border border-white/5 bg-cyber-black/60 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/35 text-neon-cyan">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold font-orbitron text-gray-500 uppercase tracking-widest">Location Matrix</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">Coimbatore, Tamil Nadu, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Input Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden h-full flex flex-col">
              <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-neon-magenta/5 rounded-full filter blur-2xl pointer-events-none" />
              
              <h3 className="text-xl font-bold font-orbitron text-white text-left mb-1">Send secure packet</h3>
              <p className="text-xs text-gray-500 text-left mb-6 uppercase tracking-wider font-bold font-orbitron">GATEWAY STATUS: ENCRYPTED</p>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 flex-grow text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold font-orbitron text-gray-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Identified Visitor"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="cyber-input"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold font-orbitron text-gray-400 uppercase">Return Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="visitor@domain.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="cyber-input"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-bold font-orbitron text-gray-400 uppercase">Subject Matrix</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    placeholder="Internship / Collaboration / Enquiry"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="cyber-input"
                  />
                </div>

                <div className="flex flex-col gap-1.5 flex-grow">
                  <label htmlFor="message" className="text-xs font-bold font-orbitron text-gray-400 uppercase">Payload Message</label>
                  <textarea
                    id="message"
                    required
                    placeholder="Enter your message details here..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="cyber-input cyber-textarea flex-grow"
                  />
                </div>

                {/* Status Toasts */}
                {formStatus.message && (
                  <div className={`p-4 rounded-xl text-sm border font-semibold ${
                    formStatus.success 
                      ? 'bg-neon-green/10 border-neon-green/45 text-neon-green' 
                      : 'bg-neon-magenta/10 border-neon-magenta/45 text-neon-magenta'
                  }`}>
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-3.5 rounded-xl border border-neon-magenta bg-neon-magenta/10 text-neon-magenta hover:bg-neon-magenta hover:text-white transition-all duration-300 font-orbitron font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-neon-magenta/10 hover:shadow-neon-magenta/45 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formLoading ? 'TRANSMITTING...' : 'DISPATCH MESSAGE'} 
                  <Send className="w-4 h-4" />
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          10. FOOTER
          ========================================== */}
      <Footer />

    </div>
  );
};

export default MainPortfolio;
