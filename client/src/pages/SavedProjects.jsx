/* eslint-disable no-unused-vars, no-empty, no-self-assign */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, FolderOpen, MoreVertical, Edit2, Copy, 
  Trash2, Star, ChevronDown, Loader2, Play, Clock
} from 'lucide-react';
import { TopNav } from '../components/layout/TopNav';
import { LeftSidebar } from '../components/layout/LeftSidebar';
import { AnimatedBackground } from '../components/layout/AnimatedBackground';
import { projectService } from '../services/projectService';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}

function formatRelativeTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

const FILTERS = ['All', 'Favorites', 'React', 'Next.js', 'Vue', 'Last 7 Days', 'Last 30 Days'];
const SORTS = ['Newest First', 'Oldest First', 'Recently Updated', 'Alphabetical'];

export default function SavedProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useLocalStorage('saved_projects_sort', 'Newest First');
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const [editingProject, setEditingProject] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [deletingProject, setDeletingProject] = useState(null);
  
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectService.getSavedProjects();
      setProjects(data || []);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (e, id, currentFav) => {
    e.stopPropagation();
    try {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, is_favorite: !currentFav } : p));
      await projectService.toggleFavorite(id, !currentFav);
    } catch (err) {
      console.error(err);
      setProjects(prev => prev.map(p => p.id === id ? { ...p, is_favorite: currentFav } : p));
    }
  };

  const handleDuplicate = async (e, project) => {
    e.stopPropagation();
    try {
      const newProj = await projectService.duplicateProject(project);
      setProjects(prev => [newProj, ...prev]);
    } catch (err) {
      console.error("Error duplicating", err);
    }
  };

  const handleDelete = async () => {
    if (!deletingProject) return;
    try {
      await projectService.deleteProject(deletingProject.id);
      setProjects(prev => prev.filter(p => p.id !== deletingProject.id));
      setDeletingProject(null);
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const handleRename = async () => {
    if (!editingProject || !newTitle.trim()) return;
    try {
      const updated = await projectService.renameProject(editingProject.id, newTitle);
      setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
      setEditingProject(null);
      setNewTitle('');
    } catch (err) {
      console.error("Error renaming", err);
    }
  };

  const handleOpenProject = (project) => {
    navigate('/app', { state: { projectId: project.id } });
  };

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title?.toLowerCase().includes(q) || 
        p.prompt?.toLowerCase().includes(q) ||
        p.framework?.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== 'All') {
      const now = new Date();
      result = result.filter(p => {
        const pDate = new Date(p.created_at);
        if (activeFilter === 'Favorites') return p.is_favorite;
        if (activeFilter === 'Last 7 Days') {
          const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
          return pDate >= sevenDaysAgo;
        }
        if (activeFilter === 'Last 30 Days') {
          const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
          return pDate >= thirtyDaysAgo;
        }
        if (['React', 'Next.js', 'Vue'].includes(activeFilter)) {
          return p.framework?.toLowerCase() === activeFilter.toLowerCase();
        }
        return true;
      });
    }

    result.sort((a, b) => {
      if (sortBy === 'Newest First') return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === 'Oldest First') return new Date(a.created_at) - new Date(b.created_at);
      if (sortBy === 'Recently Updated') return new Date(b.updated_at) - new Date(a.updated_at);
      if (sortBy === 'Alphabetical') return (a.title || '').localeCompare(b.title || '');
      return 0;
    });

    return result;
  }, [projects, searchQuery, activeFilter, sortBy]);

  return (
    <div className="h-screen w-screen bg-app text-zinc-100 flex flex-col overflow-hidden font-sans select-none relative">
      <AnimatedBackground />
      <TopNav loading={false} projectName="Saved Projects" />

      <div className="flex-1 flex overflow-hidden relative z-10">
        <LeftSidebar />

        <div className="flex-1 flex flex-col relative overflow-hidden bg-black/20 backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
          <main className="flex-1 overflow-y-auto w-full p-6 lg:p-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="max-w-7xl mx-auto space-y-8 pb-20">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold text-sm mb-4 border border-emerald-500/20">
                    <FolderOpen size={16} />
                    <span>Workspace</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-3">
                    Saved Projects
                  </h1>
                  <p className="text-lg text-zinc-400 max-w-2xl">
                    All your generated codebases and UI designs in one place.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 relative">
                  <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-violet-400 transition-colors" />
                    <input 
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-64 bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                    />
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-zinc-300 font-medium text-sm"
                    >
                      {sortBy}
                      <ChevronDown size={16} className={cn("transition-transform", isSortOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {isSortOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-1"
                          >
                            {SORTS.map(s => (
                              <button
                                key={s}
                                onClick={() => { setSortBy(s); setIsSortOpen(false); }}
                                className={cn(
                                  "w-full text-left px-4 py-2 text-sm transition-colors",
                                  sortBy === s ? "bg-violet-500/10 text-violet-400" : "text-zinc-300 hover:bg-white/5"
                                )}
                              >
                                {s}
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {FILTERS.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                      activeFilter === filter 
                        ? "bg-violet-500 text-white border-violet-500 shadow-lg shadow-violet-500/25" 
                        : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-zinc-200"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                </div>
              ) : projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-white/5 rounded-3xl bg-zinc-900/30">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                    <FolderOpen className="text-emerald-400 w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No saved projects yet</h3>
                  <p className="text-zinc-400 max-w-sm mx-auto mb-8">
                    You haven't saved any generated projects. Start building to see them here.
                  </p>
                  <button 
                    onClick={() => navigate('/app')}
                    className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Create New Project
                  </button>
                </div>
              ) : filteredAndSortedProjects.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                  <p className="text-zinc-400">Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAndSortedProjects.map(project => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onOpen={() => handleOpenProject(project)}
                      onFavorite={(e) => handleToggleFavorite(e, project.id, project.is_favorite)}
                      onDuplicate={(e) => handleDuplicate(e, project)}
                      onRename={(e) => { e.stopPropagation(); setEditingProject(project); setNewTitle(project.title); }}
                      onDelete={(e) => { e.stopPropagation(); setDeletingProject(project); }}
                    />
                  ))}
                </div>
              )}

            </div>
          </main>
        </div>
      </div>

      {/* Rename Modal */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingProject(null)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-2xl w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-white mb-4">Rename Project</h3>
              <input 
                type="text"
                autoFocus
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 mb-6"
              />
              <div className="flex justify-end gap-3">
                <button onClick={() => setEditingProject(null)} className="px-4 py-2 text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={handleRename} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-colors">Save</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {deletingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeletingProject(null)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-2xl w-full max-w-md text-center"
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-4 text-rose-500">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Project?</h3>
              <p className="text-zinc-400 mb-6">Are you sure you want to delete "{deletingProject.title}"? This action cannot be undone.</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setDeletingProject(null)} className="px-6 py-2 text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={handleDelete} className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-medium transition-colors">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function ProjectCard({ project, onOpen, onFavorite, onDuplicate, onRename, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onOpen}
      className="group relative bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all cursor-pointer shadow-lg hover:shadow-xl flex flex-col h-full"
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-white text-lg truncate pr-2 group-hover:text-violet-400 transition-colors">
            {project.title || 'Untitled Project'}
          </h3>
          <div className="flex items-center gap-1 shrink-0 relative" ref={menuRef}>
            <button 
              onClick={onFavorite}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-amber-400 hover:bg-white/5 transition-all focus:outline-none"
            >
              <Star size={18} className={cn(project.is_favorite && "fill-amber-400 text-amber-400")} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all focus:outline-none"
            >
              <MoreVertical size={18} />
            </button>
            
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 top-full mt-1 w-40 bg-zinc-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-20 py-1"
                >
                  <button onClick={(e) => { setMenuOpen(false); onRename(e); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
                    <Edit2 size={14} /> Rename
                  </button>
                  <button onClick={(e) => { setMenuOpen(false); onDuplicate(e); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
                    <Copy size={14} /> Duplicate
                  </button>
                  <div className="h-px bg-white/5 my-1" />
                  <button onClick={(e) => { setMenuOpen(false); onDelete(e); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300">
                    <Trash2 size={14} /> Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-sm text-zinc-400 line-clamp-3 mb-4 flex-1 font-mono text-xs opacity-80">
          {project.prompt || 'No prompt provided.'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-2">
            {project.framework && (
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
                {project.framework}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
            <Clock size={12} />
            {formatRelativeTime(project.created_at)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
