import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, CheckCircle2, Copy, LayoutTemplate } from 'lucide-react';

export function TemplatePreviewModal({ template, isOpen, onClose, onGenerate }) {
  if (!isOpen || !template) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-zinc-400 hover:text-white hover:bg-black/80 transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>

            {/* Left: Image Preview */}
            <div className="w-full md:w-3/5 bg-zinc-900 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent md:hidden z-10" />
              {template.thumbnail ? (
                <img 
                  src={template.thumbnail} 
                  alt={template.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              ) : (
                <div className="w-full h-64 md:h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                  <LayoutTemplate size={64} />
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-2/5 flex flex-col p-6 md:p-8 overflow-y-auto z-20">
              <div className="mb-2 text-xs font-bold tracking-wider text-violet-400 uppercase">
                {template.category}
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                {template.title || 'Untitled Template'}
              </h2>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                {template.description}
              </p>

              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {['Modern Design System', 'Responsive Layout', 'Glassmorphism Effects', 'Framer Motion Animations'].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-zinc-200 mb-3">Generated Prompt</h4>
                  <div className="relative group">
                    <div className="p-3.5 bg-zinc-900/80 border border-white/5 rounded-xl text-xs text-zinc-400 font-mono leading-relaxed line-clamp-4">
                      {template.prompt}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <button 
                  onClick={() => onGenerate(template)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5"
                >
                  <Zap size={20} className="fill-current" />
                  Generate this Template
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
