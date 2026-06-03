import React, { useRef, useEffect } from 'react';
import { Sparkles, Paperclip, ArrowUp, Zap, ChevronDown, StopCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function PromptComposer({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  loading,
  hasCode
}) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
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
    <div className={cn(
      "relative z-30 flex flex-col items-center justify-center w-full max-w-4xl mx-auto transition-all duration-500",
      hasCode ? "px-4 pb-6" : "px-4 mt-8"
    )}>
      {/* Input Container */}
      <div className="relative w-full bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/50 rounded-3xl shadow-2xl overflow-hidden focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10 transition-all group">
        
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder={hasCode ? "Describe changes or follow-up instructions..." : "Describe the interface you want to build..."}
          className="w-full min-h-[64px] bg-transparent text-zinc-100 placeholder:text-zinc-500 px-5 pt-5 pb-16 resize-none focus:outline-none font-sans text-base leading-relaxed"
          style={{ overflowY: 'auto' }}
        />
        
        {/* Bottom Toolbar inside input */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors text-sm font-medium border border-transparent hover:border-zinc-700/50">
              <Paperclip size={16} />
              <span className="hidden sm:inline">Attach</span>
            </button>
            
            {!hasCode && (
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors text-sm font-medium border border-transparent hover:border-zinc-700/50">
                <Zap size={16} className="text-amber-400/80" />
                <span className="hidden sm:inline">Templates</span>
                <ChevronDown size={14} className="ml-0.5 opacity-50" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium text-zinc-500 tracking-wider">
              {prompt.length} / 2000
            </span>
            
            <button
              onClick={onGenerate}
              disabled={!prompt.trim() && !loading}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
                loading 
                  ? "bg-zinc-800 text-zinc-400 hover:text-rose-400" 
                  : prompt.trim() 
                    ? "bg-white text-zinc-950 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                    : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"
              )}
            >
              {loading ? (
                <StopCircle size={20} className="animate-pulse" />
              ) : (
                <ArrowUp size={20} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {!hasCode && (
        <div className="flex items-center gap-4 mt-6 text-xs text-zinc-500 font-medium">
          <span className="cursor-pointer hover:text-zinc-300 transition-colors">Start with a blank canvas</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="cursor-pointer hover:text-zinc-300 transition-colors flex items-center gap-1">
            <Sparkles size={12} className="text-violet-400" />
            Try "SaaS landing page with dark theme"
          </span>
        </div>
      )}
    </div>
  );
}
