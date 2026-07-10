import React from 'react';

import { Heart, Sparkles, Eye, Zap, LayoutTemplate } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function TemplateCard({ 
  template, 
  isFavorite, 
  onToggleFavorite, 
  onPreview, 
  onGenerate 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:border-violet-500/30 transition-all duration-300"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
        
        {template.thumbnail ? (
          <img 
            src={template.thumbnail} 
            alt={template.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
            <LayoutTemplate size={48} />
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
          <div className="flex flex-col gap-2">
            {template.popular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/20 backdrop-blur-md">
                <Sparkles size={12} />
                POPULAR
              </span>
            )}
            <span className={cn(
              "inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-md w-max",
              template.difficulty === 'Beginner' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
              template.difficulty === 'Intermediate' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
              "bg-rose-500/10 text-rose-400 border-rose-500/20"
            )}>
              {template.difficulty}
            </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(template.id);
            }}
            className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-rose-400 hover:bg-black/60 transition-colors focus:outline-none"
          >
            <Heart size={16} className={cn(isFavorite && "fill-rose-500 text-rose-500")} />
          </button>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <button 
              onClick={() => onPreview(template)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold backdrop-blur-md border border-white/20 transition-colors"
            >
              <Eye size={16} /> Preview
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="text-[11px] font-bold tracking-wider text-violet-400 uppercase mb-2">
          {template.category}
        </div>
        <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-violet-300 transition-colors">
          {template.title || 'Untitled Template'}
        </h3>
        <p className="text-sm text-zinc-400 line-clamp-2 flex-1 mb-4 leading-relaxed">
          {template.description}
        </p>
        
        {/* Generate Button */}
        <button 
          onClick={() => onGenerate(template)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
        >
          <Zap size={16} className="fill-current" />
          Generate UI
        </button>
      </div>
    </motion.div>
  );
}
