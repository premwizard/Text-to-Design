import React, { useRef, useEffect } from 'react';
import { Sparkles, Paperclip, ArrowUp, Zap, ChevronDown, StopCircle, Sliders } from 'lucide-react';
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
  hasCode,
  mode = 'generate',
  setMode,
  generationMode = 'single_mode',
  setGenerationMode,
  variationCount = 1,
  setVariationCount
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
      
      {/* Dynamic Mode Switcher pill */}
      {hasCode && setMode && (
        <div className="flex gap-1.5 mb-3 bg-zinc-950/80 p-1 rounded-full border border-zinc-850 shadow-inner scale-95 origin-bottom">
          <button
            onClick={() => setMode('edit')}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
              mode === 'edit'
                ? "bg-violet-500/10 border border-violet-500/30 text-violet-400 font-extrabold"
                : "text-zinc-500 hover:text-zinc-300 border border-transparent"
            )}
          >
            <Sliders size={12} className="text-violet-400" /> Conversational Edit
          </button>
          <button
            onClick={() => setMode('generate')}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
              mode === 'generate'
                ? "bg-zinc-800 text-zinc-200 font-extrabold"
                : "text-zinc-500 hover:text-zinc-300 border border-transparent"
            )}
          >
            <Sparkles size={12} className="text-amber-400" /> Fresh Generate
          </button>
        </div>
      )}

      {/* Input Container */}
      <div className="relative w-full bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/50 rounded-3xl shadow-2xl overflow-hidden focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10 transition-all group">
        
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder={hasCode ? (mode === 'edit' ? "Describe changes to apply to components..." : "Start a new project design from scratch...") : "Describe the interface you want to build..."}
          className="w-full min-h-[64px] bg-transparent text-zinc-100 placeholder:text-zinc-500 px-5 pt-5 pb-16 resize-none focus:outline-none font-sans text-base leading-relaxed text-left"
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
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 cursor-pointer",
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
      
      {/* Mode Selection UI */}
      {(!hasCode || mode === 'generate') && setGenerationMode && (
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 px-4 py-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl shadow-lg select-none">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Generation Mode:</span>
            
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="generation_mode" 
                checked={generationMode === 'single_mode'} 
                onChange={() => {
                  setGenerationMode('single_mode');
                  setVariationCount(1);
                }}
                className="sr-only" 
              />
              <div className={cn(
                "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                generationMode === 'single_mode' 
                  ? "border-violet-500 bg-violet-500/20 text-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.3)]" 
                  : "border-zinc-700 hover:border-zinc-500"
              )}>
                {generationMode === 'single_mode' && <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />}
              </div>
              <span className={cn(
                "text-xs font-semibold transition-colors",
                generationMode === 'single_mode' ? "text-violet-400" : "text-zinc-400 group-hover:text-zinc-300"
              )}>
                Single Best Design <span className="text-[10px] text-violet-500/80 font-normal ml-0.5">(Recommended)</span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="generation_mode" 
                checked={generationMode === 'variation_mode'} 
                onChange={() => {
                  setGenerationMode('variation_mode');
                  setVariationCount(3); // Default to 3 variations
                }}
                className="sr-only" 
              />
              <div className={cn(
                "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                generationMode === 'variation_mode' 
                  ? "border-violet-500 bg-violet-500/20 text-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.3)]" 
                  : "border-zinc-700 hover:border-zinc-500"
              )}>
                {generationMode === 'variation_mode' && <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />}
              </div>
              <span className={cn(
                "text-xs font-semibold transition-colors",
                generationMode === 'variation_mode' ? "text-violet-400" : "text-zinc-400 group-hover:text-zinc-300"
              )}>
                Generate Variations
              </span>
            </label>
          </div>

          {generationMode === 'variation_mode' && setVariationCount && (
            <div className="flex items-center gap-2.5 animate-fade-in self-stretch sm:self-auto justify-between border-t border-zinc-800/40 sm:border-0 pt-2 sm:pt-0">
              <span className="text-xs font-semibold text-zinc-500">Count:</span>
              <div className="flex bg-zinc-950 p-0.5 rounded-lg border border-zinc-850">
                {[2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => setVariationCount(num)}
                    className={cn(
                      "px-3 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer",
                      variationCount === num
                        ? "bg-zinc-800/80 text-violet-400 border border-zinc-700/50 shadow-inner"
                        : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
export default PromptComposer;
