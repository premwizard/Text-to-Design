import React from 'react';
import { LivePreview } from '../LivePreview';
import { Sparkles, RefreshCw, Layout, Palette } from 'lucide-react';

export function VariationsGrid({ variations, onSelect, onRegenerate }) {
  const variationIds = Object.keys(variations || {});

  if (variationIds.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Waiting for variations...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#070708]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Sparkles className="text-violet-400" size={20} />
            Design Variations
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Select a variation to open in the workspace.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {variationIds.map((vid) => {
          const v = variations[vid];
          const plan = v.plan || {};
          const isComplete = v.status === 'complete';
          const isLoading = v.status === 'waiting' || v.status === 'generating';

          return (
            <div 
              key={vid}
              className="flex flex-col bg-[#0c0c0e] border border-zinc-800/60 rounded-2xl overflow-hidden group hover:border-violet-500/50 transition-colors shadow-lg"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-zinc-800/60 flex items-center justify-between bg-zinc-900/20">
                <div>
                  <h3 className="font-semibold text-zinc-100">{plan.name || 'Variation'}</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-zinc-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Layout size={12} className="text-emerald-400/70" />
                      {plan.layout_system?.replace(/-/g, ' ') || 'Layout'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Palette size={12} className="text-sky-400/70" />
                      {plan.aesthetic || 'Aesthetic'}
                    </span>
                  </div>
                </div>
                {isComplete && (
                  <button 
                    onClick={() => onRegenerate(vid)}
                    className="p-2 text-zinc-500 hover:text-violet-400 bg-zinc-800/30 hover:bg-violet-500/10 rounded-lg transition-colors tooltip"
                    title="Regenerate this variation"
                  >
                    <RefreshCw size={16} />
                  </button>
                )}
              </div>

              {/* Preview Container */}
              <div 
                className="relative h-[300px] w-full bg-[#050505] cursor-pointer"
                onClick={() => isComplete && onSelect(vid)}
              >
                {!isComplete && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm text-sky-400">
                    <svg className="animate-spin h-8 w-8 mb-4 text-violet-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm font-semibold animate-pulse text-zinc-300">
                      {v.timelineStep || 'Generating UI...'}
                    </p>
                  </div>
                )}
                
                {/* Live Preview Iframe */}
                {/* Note: We pass variationId to LivePreview to load the correct var.html */}
                <LivePreview 
                  code={v.code} 
                  loading={isLoading} 
                  statusText="" 
                  variationId={vid}
                />

                {isComplete && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-violet-500/10 transition-colors pointer-events-none flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all px-4 py-2 bg-violet-600 text-white font-semibold rounded-lg shadow-xl shadow-violet-900/20">
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
