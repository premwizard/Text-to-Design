import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, LayoutTemplate, Loader2 } from 'lucide-react';
import { TopNav } from '../components/layout/TopNav';
import { LeftSidebar } from '../components/layout/LeftSidebar';
import { AnimatedBackground } from '../components/layout/AnimatedBackground';
import { templateService } from '../services/templateService';
import { CategoryFilter } from '../components/templates/CategoryFilter';
import { TemplateSearch } from '../components/templates/TemplateSearch';
import { TemplateCard } from '../components/templates/TemplateCard';
import { TemplatePreviewModal } from '../components/templates/TemplatePreviewModal';

// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
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

export default function Templates() {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useLocalStorage('ai_templates_favorites', []);
  const [recentlyUsed, setRecentlyUsed] = useLocalStorage('ai_templates_recent', []);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [previewTemplate, setPreviewTemplate] = useState(null);

  useEffect(() => {
    templateService.getTemplates()
      .then(data => {
        setTemplates(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading templates", err);
        setLoading(false);
      });
  }, []);

  const handleToggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleGenerate = (template) => {
    // Add to recently used (max 6)
    setRecentlyUsed(prev => {
      const newRecent = [template.id, ...prev.filter(id => id !== template.id)].slice(0, 6);
      return newRecent;
    });
    
    // Navigate to app with prompt
    navigate('/app', { state: { initialPrompt: template.prompt } });
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = 
        (template.title || template.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (template.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (template.category || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeCategory === 'Favorites') {
        return matchesSearch && favorites.includes(template.id);
      }
      
      const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, favorites, templates]);

  const recentTemplates = useMemo(() => {
    return recentlyUsed.map(id => templates.find(t => t.id === id)).filter(Boolean);
  }, [recentlyUsed, templates]);

  // Adjust categories to inject "Favorites"
  const showRecent = recentlyUsed.length > 0 && activeCategory === 'All' && searchQuery === '';

  return (
    <div className="h-screen w-screen bg-app text-zinc-100 flex flex-col overflow-hidden font-sans select-none relative">
      <AnimatedBackground />
      <TopNav loading={false} projectName="Templates" />

      <div className="flex-1 flex overflow-hidden relative z-10">
        <LeftSidebar />

        <div className="flex-1 flex flex-col relative overflow-hidden bg-black/20 backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
          <main className="flex-1 overflow-y-auto w-full p-6 lg:p-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 font-semibold text-sm mb-4 border border-violet-500/20">
                    <LayoutTemplate size={16} />
                    <span>Template Library</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-3">
                    Start with a Template
                  </h1>
                  <p className="text-lg text-zinc-400 max-w-2xl">
                    Choose from professionally crafted examples to kickstart your next UI generation.
                  </p>
                </div>
                <div className="shrink-0">
                  <TemplateSearch value={searchQuery} onChange={setSearchQuery} />
                </div>
              </div>

              {/* Categories */}
              <CategoryFilter 
                activeCategory={activeCategory} 
                onChange={setActiveCategory} 
              />

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                </div>
              ) : (
                <>
                  {/* Recently Used */}
                  {showRecent && (
                    <section className="pt-4">
                      <h3 className="text-lg font-bold text-white mb-4">Recently Used</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recentTemplates.slice(0, 4).map(template => (
                          <TemplateCard 
                            key={`recent-${template.id}`}
                            template={template}
                            isFavorite={favorites.includes(template.id)}
                            onToggleFavorite={handleToggleFavorite}
                            onPreview={setPreviewTemplate}
                            onGenerate={handleGenerate}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Main Grid */}
                  <section className="pt-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-white">
                        {activeCategory === 'All' ? 'All Templates' : activeCategory}
                      </h3>
                      <span className="text-sm font-medium text-zinc-500">
                        {filteredTemplates.length} {filteredTemplates.length === 1 ? 'result' : 'results'}
                      </span>
                    </div>

                    {filteredTemplates.length > 0 ? (
                      <motion.div 
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20"
                      >
                        <AnimatePresence mode="popLayout">
                          {filteredTemplates.map(template => (
                            <TemplateCard 
                              key={template.id}
                              template={template}
                              isFavorite={favorites.includes(template.id)}
                              onToggleFavorite={handleToggleFavorite}
                              onPreview={setPreviewTemplate}
                              onGenerate={handleGenerate}
                            />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 px-4 text-center"
                      >
                        <div className="w-24 h-24 rounded-full bg-zinc-900/50 flex items-center justify-center mb-6 border border-white/5">
                          <SearchX className="text-zinc-500 w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No templates found</h3>
                        <p className="text-zinc-400 max-w-sm mx-auto mb-8">
                          We couldn't find any templates matching your search criteria. Try adjusting your filters.
                        </p>
                        <button 
                          onClick={() => {
                            setSearchQuery('');
                            setActiveCategory('All');
                          }}
                          className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors"
                        >
                          Clear Filters
                        </button>
                      </motion.div>
                    )}
                  </section>
                </>
              )}

            </motion.div>
          </main>
        </div>
      </div>

      {/* Modals */}
      <TemplatePreviewModal 
        template={previewTemplate}
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
