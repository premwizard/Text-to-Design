import React from 'react';
import { LivePreview } from '../LivePreview';
import { Sparkles, RefreshCw, Layout, Palette, Save, Star, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function VariationsGrid({ variations, onSelect, onRegenerate, onSave, onToggleFavorite }) {
  const variationIds = Object.keys(variations || {});

  if (variationIds.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 animate-fade-in relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-2xl backdrop-blur-md">
          <Sparkles size={32} className="text-zinc-600" />
        </div>
        <p className="text-lg font-medium text-zinc-400">Awaiting prompt instructions...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto relative z-10 scroll-smooth">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-zinc-100 flex items-center gap-3">
            <div className="p-2 bg-violet-500/20 rounded-xl border border-violet-500/30">
              <Sparkles className="text-violet-400" size={20} />
            </div>
            Design Variations
          </h2>
          <p className="text-sm font-medium text-zinc-400 mt-2 tracking-wide">
            Select a variation to open in the workspace editor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-32">
        {variationIds.map((vid) => {
          const v = variations[vid];
          const plan = v.plan || {};
          const isComplete = v.status === 'complete';
          const isLoading = v.status === 'waiting' || v.status === 'generating';

          return (
            <div 
              key={vid}
              className="flex flex-col glass-panel rounded-[2rem] overflow-hidden group hover:border-violet-500/50 transition-all duration-300 shadow-2xl transform hover:-translate-y-1"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-md">
                <div>
                  <h3 className="font-semibold text-zinc-100 text-lg tracking-wide">{plan.name || 'Variation'}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-zinc-400 font-medium">
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20 shadow-sm">
                      <Layout size={12} />
                      {plan.layout_system?.replace(/-/g, ' ') || 'Layout'}
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-sky-500/10 text-sky-400 rounded-md border border-sky-500/20 shadow-sm">
                      <Palette size={12} />
                      {plan.aesthetic || 'Aesthetic'}
                    </span>
                  </div>
                </div>
                {isComplete && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(vid); }}
                      className="p-2.5 text-zinc-400 hover:text-amber-400 glass-button rounded-xl transition-all shadow-md group/btn"
                      title="Favorite this variation"
                    >
                      <Star size={18} className={cn(v.is_favorite && "fill-amber-400 text-amber-400")} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSave(vid); }}
                      className="p-2.5 text-zinc-400 hover:text-white glass-button rounded-xl transition-all shadow-md group/btn"
                      title={v.isSaved ? "Saved to Workspace" : "Save to Workspace"}
                      disabled={v.isSaved}
                    >
                      {v.isSaved ? (
                        <Check size={18} className="text-emerald-400" />
                      ) : (
                        <Save size={18} />
                      )}
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onRegenerate(vid); }}
                      className="p-2.5 text-zinc-400 hover:text-white glass-button rounded-xl transition-all shadow-md group/btn"
                      title="Regenerate this variation"
                    >
                      <RefreshCw size={18} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                    </button>
                  </div>
                )}
              </div>

              {/* Preview Container */}
              <div 
                className="relative h-[400px] w-full bg-[#030303] cursor-pointer overflow-hidden"
                onClick={() => isComplete && onSelect(vid)}
              >
                {!isComplete && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
                      <div className="w-16 h-16 border-4 border-white/10 border-t-violet-500 rounded-full animate-spin shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
                    </div>
                    <p className="text-sm font-semibold animate-pulse text-zinc-300 tracking-wider uppercase">
                      {v.timelineStep || 'Generating UI...'}
                    </p>
                  </div>
                )}
                
                {/* Live Preview Iframe */}
                <div className="w-full h-full transform transition-transform duration-700 group-hover:scale-[1.02] pointer-events-none">
                  <LivePreview 
                    code={v.code} 
                    loading={isLoading} 
                    statusText="" 
                    variationId={vid}
                  />
                </div>

                {isComplete && (
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex items-center justify-center backdrop-blur-[2px]">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 px-6 py-3 bg-white text-zinc-950 font-bold rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2">
                      <Sparkles size={18} />
                      Open in Workspace
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
