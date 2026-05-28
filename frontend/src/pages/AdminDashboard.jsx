import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  FolderGit2, Award, Brain, Mail, Calendar, LogOut, Check,
  Trash2, Plus, Edit2, ShieldCheck, Database, Laptop, Info, ArrowLeft
} from 'lucide-react';

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Selected administrative tab
  const [activeTab, setActiveTab] = useState('projects');

  // Unified Data State pools
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certs, setCerts] = useState([]);
  const [exps, setExps] = useState([]);
  const [messages, setMessages] = useState([]);

  // Form Trigger states
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Active items being edited (null = Adding new)
  const [editingId, setEditingId] = useState(null);

  // Form Fields State
  const [projectForm, setProjectForm] = useState({ title: '', description: '', longDescription: '', techStack: '', githubLink: '', liveLink: '', image: '', isFeatured: false });
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Languages', level: 'Intermediate' });
  const [certForm, setCertForm] = useState({ name: '', issuer: '', date: '', credentialId: '', credentialUrl: '' });
  const [expForm, setExpForm] = useState({ role: '', company: '', duration: '', descriptionText: '' });

  const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

  // Load dashboard dataset
  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, skillRes, certRes, expRes, msgRes] = await Promise.all([
        axios.get(`${apiBase}/api/projects`),
        axios.get(`${apiBase}/api/skills`),
        axios.get(`${apiBase}/api/certs`),
        axios.get(`${apiBase}/api/exp`),
        axios.get(`${apiBase}/api/messages`)
      ]);

      if (projRes.data.success) setProjects(projRes.data.data);
      if (skillRes.data.success) setSkills(skillRes.data.data);
      if (certRes.data.success) setCerts(certRes.data.data);
      if (expRes.data.success) setExps(expRes.data.data);
      if (msgRes.data.success) setMessages(msgRes.data.data);
    } catch (err) {
      console.error('API Pull Failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Flash system helper
  const flashMessage = (success = '', error = '') => {
    setFormSuccess(success);
    setFormError(error);
    setTimeout(() => {
      setFormSuccess('');
      setFormError('');
    }, 4000);
  };

  // ==========================================
  // PROJECTS CRUD
  // ==========================================
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      techStack: projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await axios.put(`${apiBase}/api/projects/${editingId}`, payload);
        flashMessage('Project updated successfully!');
      } else {
        await axios.post(`${apiBase}/api/projects`, payload);
        flashMessage('Project created successfully!');
      }
      setProjectForm({ title: '', description: '', longDescription: '', techStack: '', githubLink: '', liveLink: '', image: '', isFeatured: false });
      setEditingId(null);
      loadData();
    } catch (err) {
      flashMessage('', err.response?.data?.error || 'Project operation failed.');
    }
  };

  const startEditProject = (proj) => {
    setEditingId(proj._id);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      longDescription: proj.longDescription || '',
      techStack: proj.techStack.join(', '),
      githubLink: proj.githubLink || '',
      liveLink: proj.liveLink || '',
      image: proj.image || '',
      isFeatured: proj.isFeatured || false
    });
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`${apiBase}/api/projects/${id}`);
      flashMessage('Project deleted successfully.');
      loadData();
    } catch (err) {
      flashMessage('', 'Deletion failed.');
    }
  };

  // ==========================================
  // SKILLS CRUD
  // ==========================================
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${apiBase}/api/skills/${editingId}`, skillForm);
        flashMessage('Skill updated successfully!');
      } else {
        await axios.post(`${apiBase}/api/skills`, skillForm);
        flashMessage('Skill added successfully!');
      }
      setSkillForm({ name: '', category: 'Languages', level: 'Intermediate' });
      setEditingId(null);
      loadData();
    } catch (err) {
      flashMessage('', 'Skill save failed.');
    }
  };

  const startEditSkill = (sk) => {
    setEditingId(sk._id);
    setSkillForm({ name: sk.name, category: sk.category, level: sk.level });
  };

  const deleteSkill = async (id) => {
    if (!window.confirm('Delete skill?')) return;
    try {
      await axios.delete(`${apiBase}/api/skills/${id}`);
      flashMessage('Skill deleted successfully.');
      loadData();
    } catch (err) {
      flashMessage('', 'Deletion failed.');
    }
  };

  // ==========================================
  // EXPERIENCES CRUD
  // ==========================================
  const handleExpSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      role: expForm.role,
      company: expForm.company,
      duration: expForm.duration,
      description: expForm.descriptionText.split('\n').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await axios.put(`${apiBase}/api/exp/${editingId}`, payload);
        flashMessage('Experience updated!');
      } else {
        await axios.post(`${apiBase}/api/exp`, payload);
        flashMessage('Experience created!');
      }
      setExpForm({ role: '', company: '', duration: '', descriptionText: '' });
      setEditingId(null);
      loadData();
    } catch (err) {
      flashMessage('', 'Experience save failed.');
    }
  };

  const startEditExp = (ex) => {
    setEditingId(ex._id);
    setExpForm({
      role: ex.role,
      company: ex.company,
      duration: ex.duration,
      descriptionText: ex.description.join('\n')
    });
  };

  const deleteExp = async (id) => {
    if (!window.confirm('Delete experience?')) return;
    try {
      await axios.delete(`${apiBase}/api/exp/${id}`);
      flashMessage('Experience deleted.');
      loadData();
    } catch (err) {
      flashMessage('', 'Deletion failed.');
    }
  };

  // ==========================================
  // CERTIFICATIONS CRUD
  // ==========================================
  const handleCertSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${apiBase}/api/certs/${editingId}`, certForm);
        flashMessage('Certification updated!');
      } else {
        await axios.post(`${apiBase}/api/certs`, certForm);
        flashMessage('Certification added!');
      }
      setCertForm({ name: '', issuer: '', date: '', credentialId: '', credentialUrl: '' });
      setEditingId(null);
      loadData();
    } catch (err) {
      flashMessage('', 'Certification save failed.');
    }
  };

  const startEditCert = (ce) => {
    setEditingId(ce._id);
    setCertForm({
      name: ce.name,
      issuer: ce.issuer,
      date: ce.date,
      credentialId: ce.credentialId || '',
      credentialUrl: ce.credentialUrl || ''
    });
  };

  const deleteCert = async (id) => {
    if (!window.confirm('Delete certification?')) return;
    try {
      await axios.delete(`${apiBase}/api/certs/${id}`);
      flashMessage('Certification deleted.');
      loadData();
    } catch (err) {
      flashMessage('', 'Deletion failed.');
    }
  };

  // ==========================================
  // CONTACT MESSAGES CRUD
  // ==========================================
  const markMessageAsRead = async (id) => {
    try {
      await axios.put(`${apiBase}/api/messages/${id}/read`);
      flashMessage('Message marked as read.');
      loadData();
    } catch (err) {
      flashMessage('', 'Marking read failed.');
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete message thread?')) return;
    try {
      await axios.delete(`${apiBase}/api/messages/${id}`);
      flashMessage('Message deleted.');
      loadData();
    } catch (err) {
      flashMessage('', 'Deletion failed.');
    }
  };

  return (
    <div className="relative min-h-screen bg-cyber-black text-white p-6 cyber-grid flex flex-col gap-6">
      
      {/* Top Banner header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10 mt-16">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="p-2 border border-white/10 hover:border-neon-cyan hover:text-neon-cyan bg-white/5 rounded-lg transition-colors cursor-pointer"
            title="Return to Main Website"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black font-orbitron text-white tracking-wide">
              Control Panel
            </h1>
            <p className="text-xs text-gray-500 font-bold font-orbitron tracking-widest uppercase">
              Operator: {user?.username || 'Mukesh V'} // Security: Secured
            </p>
          </div>
        </div>

        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="px-5 py-2.5 rounded-xl border border-neon-magenta bg-neon-magenta/5 text-neon-magenta hover:bg-neon-magenta hover:text-white transition-all duration-300 font-orbitron font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-neon-magenta/5 hover:shadow-neon-magenta/30"
        >
          LOG OUT <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Database Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl border border-white/5 bg-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">PROJECTS</span>
            <h3 className="font-black font-orbitron text-2xl text-neon-cyan">{projects.length}</h3>
          </div>
          <FolderGit2 className="w-8 h-8 text-neon-cyan/20" />
        </div>
        
        <div className="p-4 rounded-xl border border-white/5 bg-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">SKILLS</span>
            <h3 className="font-black font-orbitron text-2xl text-neon-magenta">{skills.length}</h3>
          </div>
          <Brain className="w-8 h-8 text-neon-magenta/20" />
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">TIMELINE</span>
            <h3 className="font-black font-orbitron text-2xl text-neon-green">{exps.length}</h3>
          </div>
          <Calendar className="w-8 h-8 text-neon-green/20" />
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">CERTS</span>
            <h3 className="font-black font-orbitron text-2xl text-yellow-400">{certs.length}</h3>
          </div>
          <Award className="w-8 h-8 text-yellow-400/20" />
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-cyber-card flex items-center justify-between col-span-2 lg:col-span-1">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">MAIL INBOX</span>
            <h3 className="font-black font-orbitron text-2xl text-white">
              {messages.filter(m => !m.isRead).length} <span className="text-xs text-gray-500 font-normal">unread</span>
            </h3>
          </div>
          <Mail className="w-8 h-8 text-white/20" />
        </div>
      </div>

      {/* Center Layout Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Tab sidebar selectors */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          {[
            { id: 'projects', label: 'PROJECTS VAULT', icon: <FolderGit2 className="w-4 h-4" /> },
            { id: 'skills', label: 'SKILLS STACK', icon: <Brain className="w-4 h-4" /> },
            { id: 'timeline', label: 'EXPERIENCE TRACK', icon: <Calendar className="w-4 h-4" /> },
            { id: 'certs', label: 'CERTIFICATIONS', icon: <Award className="w-4 h-4" /> },
            { id: 'messages', label: 'CONTACT MAIL', icon: <Mail className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setEditingId(null); }}
              className={`w-full p-4 rounded-xl border font-orbitron font-bold text-xs tracking-wider flex items-center gap-3 transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan shadow-neon-cyan/10'
                  : 'border-white/5 bg-cyber-card text-gray-400 hover:text-white hover:border-white/10'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Pane */}
        <div className="lg:col-span-9 flex flex-col gap-6 text-left">
          
          {/* Flash message popups */}
          {(formSuccess || formError) && (
            <div className={`p-4 rounded-xl text-sm border font-semibold ${
              formSuccess ? 'bg-neon-green/10 border-neon-green/35 text-neon-green' : 'bg-neon-magenta/10 border-neon-magenta/35 text-neon-magenta'
            }`}>
              {formSuccess || formError}
            </div>
          )}

          {/* ==========================================
              TAB: PROJECTS
              ========================================== */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form card */}
              <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
                <h3 className="font-orbitron font-bold text-base text-neon-cyan border-b border-white/5 pb-2">
                  {editingId ? 'EDIT PROJECT' : 'ADD NEW PROJECT'}
                </h3>
                <form onSubmit={handleProjectSubmit} className="flex flex-col gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Project Name"
                      className="cyber-input py-2 px-3"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Brief Intro</label>
                    <input
                      type="text"
                      required
                      placeholder="One line description"
                      className="cyber-input py-2 px-3"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Long Description</label>
                    <textarea
                      placeholder="Detailed architecture description..."
                      className="cyber-input py-2 px-3 h-20"
                      value={projectForm.longDescription}
                      onChange={(e) => setProjectForm({...projectForm, longDescription: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Tech Stack (Comma Separated)</label>
                    <input
                      type="text"
                      required
                      placeholder="React, Node, Express"
                      className="cyber-input py-2 px-3"
                      value={projectForm.techStack}
                      onChange={(e) => setProjectForm({...projectForm, techStack: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">GitHub Link</label>
                      <input
                        type="url"
                        placeholder="https://github.com..."
                        className="cyber-input py-2 px-3"
                        value={projectForm.githubLink}
                        onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Live Application</label>
                      <input
                        type="url"
                        placeholder="https://website.com..."
                        className="cyber-input py-2 px-3"
                        value={projectForm.liveLink}
                        onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Cover Image URL</label>
                    <input
                      type="text"
                      placeholder="https://unsplash.com/..."
                      className="cyber-input py-2 px-3"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-2 py-1 font-orbitron font-bold text-[10px] text-gray-400 uppercase">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      className="w-4 h-4 accent-neon-cyan"
                      checked={projectForm.isFeatured}
                      onChange={(e) => setProjectForm({...projectForm, isFeatured: e.target.checked})}
                    />
                    <label htmlFor="isFeatured" className="cursor-pointer">FEATURED SHOWCASE</label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl border border-neon-cyan bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan hover:text-cyber-black transition-all font-orbitron font-bold text-xs uppercase tracking-widest cursor-pointer mt-2"
                  >
                    {editingId ? 'COMMIT EDIT' : 'SUBMIT ASSET'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setProjectForm({ title: '', description: '', longDescription: '', techStack: '', githubLink: '', liveLink: '', image: '', isFeatured: false });
                      }}
                      className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-all font-orbitron font-bold text-xs uppercase tracking-widest cursor-pointer"
                    >
                      CANCEL EDIT
                    </button>
                  )}
                </form>
              </div>

              {/* Data list column */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <h3 className="font-orbitron font-bold text-base text-gray-400">ACTIVE PROJECT GRID</h3>
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px]">
                  {projects.map((proj) => (
                    <div key={proj._id} className="p-4 rounded-xl border border-white/5 bg-cyber-card flex items-center justify-between gap-4">
                      <div className="truncate text-left flex-grow">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm truncate">{proj.title}</h4>
                          {proj.isFeatured && (
                            <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan font-orbitron uppercase">FEATURED</span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-500 font-sans truncate">{proj.techStack.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditProject(proj)}
                          className="p-2 border border-white/10 hover:border-neon-cyan hover:text-neon-cyan bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProject(proj._id)}
                          className="p-2 border border-white/10 hover:border-neon-magenta hover:text-neon-magenta bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ==========================================
              TAB: SKILLS
              ========================================== */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form */}
              <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
                <h3 className="font-orbitron font-bold text-base text-neon-magenta border-b border-white/5 pb-2">
                  {editingId ? 'EDIT SKILL' : 'ADD SKILL'}
                </h3>
                <form onSubmit={handleSkillSubmit} className="flex flex-col gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Skill Name</label>
                    <input
                      type="text"
                      required
                      placeholder="React, C++, TensorFlow"
                      className="cyber-input py-2 px-3"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({...skillForm, name: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Category</label>
                    <select
                      className="cyber-input py-2 px-3"
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({...skillForm, category: e.target.value})}
                    >
                      {['Languages', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Other'].map(cat => (
                        <option key={cat} value={cat} className="bg-cyber-black">{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Capacity Level</label>
                    <select
                      className="cyber-input py-2 px-3"
                      value={skillForm.level}
                      onChange={(e) => setSkillForm({...skillForm, level: e.target.value})}
                    >
                      {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                        <option key={lvl} value={lvl} className="bg-cyber-black">{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl border border-neon-magenta bg-neon-magenta/10 text-neon-magenta hover:bg-neon-magenta hover:text-white transition-all font-orbitron font-bold text-xs uppercase tracking-widest cursor-pointer mt-2"
                  >
                    {editingId ? 'COMMIT EDIT' : 'SUBMIT SKILL'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => { setEditingId(null); setSkillForm({ name: '', category: 'Languages', level: 'Intermediate' }); }}
                      className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-all font-orbitron font-bold text-xs uppercase tracking-widest cursor-pointer"
                    >
                      CANCEL EDIT
                    </button>
                  )}
                </form>
              </div>

              {/* Data list */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <h3 className="font-orbitron font-bold text-base text-gray-400">ACTIVE SKILLS GRID</h3>
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px]">
                  {skills.map((sk) => (
                    <div key={sk._id} className="p-4 rounded-xl border border-white/5 bg-cyber-card flex items-center justify-between gap-4">
                      <div className="text-left">
                        <h4 className="font-bold text-white text-sm">{sk.name}</h4>
                        <span className="text-[10px] text-gray-500 font-bold uppercase font-orbitron tracking-widest">{sk.category} // {sk.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditSkill(sk)}
                          className="p-2 border border-white/10 hover:border-neon-cyan hover:text-neon-cyan bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteSkill(sk._id)}
                          className="p-2 border border-white/10 hover:border-neon-magenta hover:text-neon-magenta bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB: TIMELINE (EXPERIENCES)
              ========================================== */}
          {activeTab === 'timeline' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form */}
              <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
                <h3 className="font-orbitron font-bold text-base text-neon-green border-b border-white/5 pb-2">
                  {editingId ? 'EDIT POSITION' : 'ADD TIMELINE NODE'}
                </h3>
                <form onSubmit={handleExpSubmit} className="flex flex-col gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Position Role</label>
                    <input
                      type="text"
                      required
                      placeholder="Computer Vision Intern"
                      className="cyber-input py-2 px-3"
                      value={expForm.role}
                      onChange={(e) => setExpForm({...expForm, role: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Company</label>
                    <input
                      type="text"
                      required
                      placeholder="Octanet Services"
                      className="cyber-input py-2 px-3"
                      value={expForm.company}
                      onChange={(e) => setExpForm({...expForm, company: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Duration</label>
                    <input
                      type="text"
                      required
                      placeholder="Oct 2025 - Nov 2025"
                      className="cyber-input py-2 px-3"
                      value={expForm.duration}
                      onChange={(e) => setExpForm({...expForm, duration: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Bullets description (Line by line)</label>
                    <textarea
                      required
                      placeholder="Bullet 1&#10;Bullet 2&#10;Bullet 3"
                      className="cyber-input py-2 px-3 h-24"
                      value={expForm.descriptionText}
                      onChange={(e) => setExpForm({...expForm, descriptionText: e.target.value})}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl border border-neon-green bg-neon-green/10 text-neon-green hover:bg-neon-green hover:text-cyber-black transition-all font-orbitron font-bold text-xs uppercase tracking-widest cursor-pointer mt-2"
                  >
                    {editingId ? 'COMMIT EDIT' : 'SUBMIT NODE'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => { setEditingId(null); setExpForm({ role: '', company: '', duration: '', descriptionText: '' }); }}
                      className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-all font-orbitron font-bold text-xs uppercase tracking-widest cursor-pointer"
                    >
                      CANCEL EDIT
                    </button>
                  )}
                </form>
              </div>

              {/* Data list */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <h3 className="font-orbitron font-bold text-base text-gray-400">ACTIVE TIMELINE</h3>
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px]">
                  {exps.map((ex) => (
                    <div key={ex._id} className="p-4 rounded-xl border border-white/5 bg-cyber-card flex items-center justify-between gap-4">
                      <div className="text-left truncate max-w-[80%]">
                        <h4 className="font-bold text-white text-sm truncate">{ex.role}</h4>
                        <span className="text-[10px] text-gray-500 font-bold uppercase font-orbitron tracking-widest">{ex.company} // {ex.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditExp(ex)}
                          className="p-2 border border-white/10 hover:border-neon-cyan hover:text-neon-cyan bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteExp(ex._id)}
                          className="p-2 border border-white/10 hover:border-neon-magenta hover:text-neon-magenta bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB: CERTIFICATIONS
              ========================================== */}
          {activeTab === 'certs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form */}
              <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
                <h3 className="font-orbitron font-bold text-base text-yellow-400 border-b border-white/5 pb-2">
                  {editingId ? 'EDIT CERTIFICATION' : 'ADD CERTIFICATION'}
                </h3>
                <form onSubmit={handleCertSubmit} className="flex flex-col gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Cert Name</label>
                    <input
                      type="text"
                      required
                      placeholder="AWS Cloud Practitioner"
                      className="cyber-input py-2 px-3"
                      value={certForm.name}
                      onChange={(e) => setCertForm({...certForm, name: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Issuer Institution</label>
                    <input
                      type="text"
                      required
                      placeholder="Amazon Web Services"
                      className="cyber-input py-2 px-3"
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({...certForm, issuer: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Year Issued</label>
                      <input
                        type="text"
                        required
                        placeholder="2025"
                        className="cyber-input py-2 px-3"
                        value={certForm.date}
                        onChange={(e) => setCertForm({...certForm, date: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Credential ID</label>
                      <input
                        type="text"
                        placeholder="AWS-CPE-12345"
                        className="cyber-input py-2 px-3"
                        value={certForm.credentialId}
                        onChange={(e) => setCertForm({...certForm, credentialId: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400">Verification URL</label>
                    <input
                      type="url"
                      placeholder="https://aws.amazon.com/..."
                      className="cyber-input py-2 px-3"
                      value={certForm.credentialUrl}
                      onChange={(e) => setCertForm({...certForm, credentialUrl: e.target.value})}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl border border-yellow-400 bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-cyber-black transition-all font-orbitron font-bold text-xs uppercase tracking-widest cursor-pointer mt-2"
                  >
                    {editingId ? 'COMMIT EDIT' : 'SUBMIT CERT'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => { setEditingId(null); setCertForm({ name: '', issuer: '', date: '', credentialId: '', credentialUrl: '' }); }}
                      className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-all font-orbitron font-bold text-xs uppercase tracking-widest cursor-pointer"
                    >
                      CANCEL EDIT
                    </button>
                  )}
                </form>
              </div>

              {/* Data list */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <h3 className="font-orbitron font-bold text-base text-gray-400">ACTIVE CERTS LIST</h3>
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px]">
                  {certs.map((ce) => (
                    <div key={ce._id} className="p-4 rounded-xl border border-white/5 bg-cyber-card flex items-center justify-between gap-4">
                      <div className="text-left truncate max-w-[80%]">
                        <h4 className="font-bold text-white text-sm truncate">{ce.name}</h4>
                        <span className="text-[10px] text-gray-500 font-bold uppercase font-orbitron tracking-widest">{ce.issuer} // {ce.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditCert(ce)}
                          className="p-2 border border-white/10 hover:border-neon-cyan hover:text-neon-cyan bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCert(ce._id)}
                          className="p-2 border border-white/10 hover:border-neon-magenta hover:text-neon-magenta bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB: MESSAGES (CONTACT LOGS)
              ========================================== */}
          {activeTab === 'messages' && (
            <div className="flex flex-col gap-4">
              <h3 className="font-orbitron font-bold text-base text-gray-400">INBOX TELEMETRY LOGS</h3>
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
                {messages.length === 0 ? (
                  <div className="p-8 rounded-xl border border-dashed border-white/10 text-center text-gray-500 font-rajdhani text-lg font-bold">
                    INBOX QUEUE EMPTY // NO MESSAGES
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div 
                      key={msg._id} 
                      className={`p-6 rounded-xl border relative transition-all duration-300 ${
                        msg.isRead 
                          ? 'border-white/5 bg-cyber-card/40 opacity-70' 
                          : 'border-neon-cyan/30 bg-neon-cyan/5 shadow-md shadow-neon-cyan/5'
                      }`}
                    >
                      {/* Top banner sender details */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3 mb-3">
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-bold font-orbitron text-white text-base">{msg.name}</span>
                            {!msg.isRead && (
                              <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-neon-cyan/25 border border-neon-cyan/45 text-neon-cyan font-orbitron uppercase">NEW MESSAGE</span>
                            )}
                          </div>
                          <a href={`mailto:${msg.email}`} className="text-xs text-neon-cyan hover:underline">{msg.email}</a>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-gray-500 font-bold font-orbitron uppercase">Received: {new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Msg Body */}
                      <div className="text-left">
                        <h4 className="text-sm font-bold font-orbitron text-white mb-1"><span className="text-neon-magenta font-bold">SUBJECT:</span> {msg.subject}</h4>
                        <p className="text-sm text-gray-300 leading-relaxed font-sans white-space-pre-wrap">{msg.message}</p>
                      </div>

                      {/* Action buttons footer inside message block */}
                      <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-white/5">
                        {!msg.isRead && (
                          <button
                            onClick={() => markMessageAsRead(msg._id)}
                            className="px-3.5 py-1.5 rounded-lg border border-neon-green/30 bg-neon-green/5 text-neon-green hover:bg-neon-green hover:text-cyber-black text-xs font-bold font-orbitron transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" /> MARK READ
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(msg._id)}
                          className="px-3.5 py-1.5 rounded-lg border border-neon-magenta/30 bg-neon-magenta/5 text-neon-magenta hover:bg-neon-magenta hover:text-white text-xs font-bold font-orbitron transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> DELETE RECORD
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
