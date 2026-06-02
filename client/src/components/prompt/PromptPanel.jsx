import React, { useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Image as ImageIcon, 
  Mic, 
  Layout, 
  Monitor, 
  Briefcase, 
  ShoppingCart,
  CheckCircle2,
  CircleDashed,
  AlertCircle,
  Smartphone
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TEMPLATES = [
  { id: 'landing', label: 'SaaS Landing Page', icon: Layout, desc: 'Modern SaaS landing page' },
  { id: 'portfolio', label: 'Portfolio Website', icon: Briefcase, desc: 'Creative personal site' },
  { id: 'dashboard', label: 'Analytics Dashboard', icon: Monitor, desc: 'Analytics and data view' },
  { id: 'ecommerce', label: 'E-Commerce Store', icon: ShoppingCart, desc: 'Online store front' },
  { id: 'mobile', label: 'Mobile App', icon: Smartphone, desc: 'Mobile-first interface' },
  { id: 'ai', label: 'AI Tool', icon: Sparkles, desc: 'AI generation interface' },
];

const STEPS = [
  { id: 'understanding', label: 'Understanding Request' },
  { id: 'planning', label: 'Creating Design Plan' },
  { id: 'components', label: 'Building Components' },
  { id: 'layout', label: 'Generating Layout' },
  { id: 'optimizing', label: 'Optimizing UI' },
  { id: 'fixing', label: 'Fixing Errors' },
];

export function PromptPanel({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  loading, 
  error,
  hasCode
}) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim() && !loading) {
        onGenerate();
      }
    }
  };

  return (
    <div className="flex-1 min-w-[450px] shrink-0 flex flex-col h-full bg-[#0c0c0e] relative overflow-hidden">
      
      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col max-w-4xl mx-auto w-full">
        
        {/* Empty State / Welcome */}
        {!hasCode && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in mb-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-500/20 to-indigo-500/20 flex items-center justify-center mb-6 ring-1 ring-violet-500/30">
              <Sparkles size={32} className="text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-2 text-center">
              What would you like to build today?
            </h2>
            <p className="text-zinc-400 text-center text-sm max-w-md mb-10">
              Describe your vision in plain English, and our AI will generate a production-ready React interface.
            </p>

            {/* Templates Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
              {TEMPLATES.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setPrompt(`Build a ${t.label.toLowerCase()}: ${t.desc}`)}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:bg-zinc-800/50 hover:border-violet-500/30 transition-all duration-200 group text-left"
                  >
                    <div className="p-2.5 rounded-xl bg-zinc-950 text-zinc-400 group-hover:text-violet-400 transition-colors">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors">{t.label}</h3>
                      <p className="text-xs text-zinc-500 mt-1">{t.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Loading / Generation Progress */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in max-w-md mx-auto w-full">
            <div className="w-full bg-zinc-900/80 rounded-2xl p-6 border border-zinc-800 shadow-2xl">
              <h3 className="font-semibold text-lg text-zinc-200 mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-violet-400 animate-pulse" />
                Generating UI...
              </h3>
              
              <div className="space-y-4">
                {STEPS.map((step, idx) => (
                  <div key={step.id} className="flex items-center gap-3 text-sm">
                    {/* Mock progress states - in reality this would be driven by real backend status */}
                    <CheckCircle2 size={20} className="text-violet-500" />
                    <span className="text-zinc-300">{step.label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 text-sm animate-pulse">
                  <CircleDashed size={20} className="text-zinc-500 animate-spin" />
                  <span className="text-violet-400">Rendering preview...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-auto mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 animate-fade-in">
            <AlertCircle size={20} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-rose-400">Generation Error</h4>
              <p className="text-xs text-rose-300/80 mt-1">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Prompt Input Area */}
      <div className="p-4 bg-[#0c0c0e]/80 backdrop-blur-xl border-t border-zinc-800/50 relative z-10 shrink-0">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button className="p-2.5 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors" title="Upload Image">
              <ImageIcon size={20} />
            </button>
            <button className="p-2.5 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors" title="Voice Input">
              <Mic size={20} />
            </button>
          </div>
          
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the website, dashboard, mobile app or interface you want to generate..."
            disabled={loading}
            className="w-full min-h-[56px] max-h-[300px] bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-4 pr-32 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none shadow-sm"
            style={{ overflowY: 'auto' }}
          />

          <div className="absolute bottom-4 right-4 flex items-center gap-4">
            <span className="text-xs text-zinc-600 font-medium">
              {prompt.length} / 2000
            </span>
            <button
              onClick={onGenerate}
              disabled={loading || !prompt.trim()}
              className="flex items-center gap-2 h-11 px-5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-violet-900/20 active:scale-95"
            >
              <Send size={18} className="ml-0.5" />
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
