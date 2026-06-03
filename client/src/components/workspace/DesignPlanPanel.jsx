import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  CircleDashed,
  LayoutTemplate,
  Palette,
  Type,
  Layers,
  ChevronRight,
  Sparkles,
  Component
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TIMELINE_STEPS = [
  "Understanding Prompt",
  "Determining Page Type",
  "Selecting Design System",
  "Creating Component Structure",
  "Defining Visual Style",
  "Building Design Plan",
  "Generating React Components",
  "Finalizing Project"
];

// Helper to determine step status
function getStepStatus(step, currentStep, planExists) {
  const currentIndex = TIMELINE_STEPS.indexOf(currentStep);
  const stepIndex = TIMELINE_STEPS.indexOf(step);
  
  if (stepIndex < currentIndex) return 'completed';
  if (stepIndex === currentIndex) return 'active';
  
  // Special case: if plan exists but we haven't hit "Generating React Components" yet, 
  // steps up to "Building Design Plan" are completed.
  if (planExists && stepIndex <= TIMELINE_STEPS.indexOf("Building Design Plan") && currentIndex < TIMELINE_STEPS.indexOf("Generating React Components")) {
    return 'completed';
  }
  
  return 'pending';
}

function extractFontName(fontString) {
  if (!fontString) return '';
  return fontString.split(':')[0].replace(/\+/g, ' ');
}

export function DesignPlanPanel({ plan, timelineStep }) {
  // Inject fonts requested by the plan
  useEffect(() => {
    if (!plan) return;
    
    const headingFont = extractFontName(plan.font_heading);
    const bodyFont = extractFontName(plan.font_body);
    
    if (headingFont || bodyFont) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${headingFont.replace(/ /g, '+')}:wght@400;600;700&family=${bodyFont.replace(/ /g, '+')}:wght@400;500;600&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [plan]);

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-[#09090b] text-zinc-100 overflow-hidden min-w-[500px]">
      {/* Sidebar: AI Thinking Timeline */}
      <div className="w-full lg:w-80 border-r border-zinc-800/80 bg-zinc-950/50 p-6 flex flex-col shrink-0 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="text-violet-400 w-5 h-5" />
          <h2 className="font-semibold tracking-tight text-zinc-100">AI Design Planning</h2>
        </div>
        
        <div className="relative flex-1">
          <div className="absolute top-4 bottom-8 left-[11px] w-px bg-zinc-800/60" />
          
          <div className="space-y-6 relative">
            {TIMELINE_STEPS.map((step, idx) => {
              const status = getStepStatus(step, timelineStep, !!plan);
              
              return (
                <div key={idx} className="flex gap-4 relative">
                  <div className="relative flex items-center justify-center shrink-0 z-10 mt-0.5">
                    {status === 'completed' ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center ring-1 ring-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    ) : status === 'active' ? (
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center ring-1 ring-violet-500/40 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                        <div className="w-2 h-2 rounded-full bg-violet-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center ring-1 ring-zinc-800">
                        <CircleDashed className="w-3.5 h-3.5 text-zinc-600" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      status === 'completed' ? "text-zinc-300" :
                      status === 'active' ? "text-zinc-100" : "text-zinc-600"
                    )}>
                      {step}
                    </p>
                    <AnimatePresence>
                      {status === 'active' && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-zinc-500 mt-1"
                        >
                          Synthesizing requirements...
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content: Design Plan Visualization */}
      <div className="flex-1 overflow-y-auto bg-dot-grid relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/50 to-[#09090b] pointer-events-none" />
        
        <div className="relative z-10 p-8 max-w-5xl mx-auto min-h-full flex flex-col justify-center">
          {!plan ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent" />
                <LayoutTemplate className="w-8 h-8 text-violet-400 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-zinc-200">Analyzing Request</h3>
              <p className="text-sm text-zinc-500 max-w-sm">
                Evaluating aesthetic, layout, and component requirements to construct the perfect interface.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
              className="space-y-8"
            >
              {/* Header Info */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-6 pb-6 border-b border-zinc-800/60"
              >
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-100">{plan.product_name}</h1>
                  <p className="text-zinc-400 mt-2 font-medium">{plan.tagline}</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* General Config */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm"
                >
                  <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 mb-6">
                    <Layers className="w-4 h-4 text-violet-400" />
                    Architecture
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/40">
                      <span className="text-sm text-zinc-500">Page Type</span>
                      <span className="text-sm font-medium text-zinc-300 capitalize">{plan.page_type}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/40">
                      <span className="text-sm text-zinc-500">Design Archetype</span>
                      <span className="text-sm font-medium text-zinc-300 capitalize">{plan.design_archetype}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/40">
                      <span className="text-sm text-zinc-500">Layout System</span>
                      <span className="text-sm font-medium text-zinc-300 capitalize">{plan.layout_system}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-zinc-500">Visual Style</span>
                      <span className="text-sm font-medium text-zinc-300 capitalize">{plan.visual_style}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Styling (Colors & Fonts) */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm"
                >
                  <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 mb-6">
                    <Palette className="w-4 h-4 text-emerald-400" />
                    Aesthetics: {plan.aesthetic}
                  </h3>
                  
                  {/* Colors */}
                  <div className="mb-6">
                    <p className="text-xs text-zinc-500 font-medium mb-3">Color Palette</p>
                    <div className="flex gap-3">
                      {/* Simulating Tailwind colors by mapping to generic hex for preview, or just showing the class */}
                      {/* Note: since we only have classes like "bg-slate-950", we'll just show the class names creatively */}
                      <div className="flex flex-col gap-1.5 items-center">
                        <div className={cn("w-10 h-10 rounded-full border border-zinc-700 shadow-inner", plan.bg_color)} />
                        <span className="text-[10px] text-zinc-500">Back</span>
                      </div>
                      <div className="flex flex-col gap-1.5 items-center">
                        <div className={cn("w-10 h-10 rounded-full border border-zinc-700 shadow-inner", `bg-${plan.primary_color}`)} />
                        <span className="text-[10px] text-zinc-500">Brand</span>
                      </div>
                      <div className="flex flex-col gap-1.5 items-center">
                        <div className={cn("w-10 h-10 rounded-full border border-zinc-700 shadow-inner bg-zinc-100")} />
                        <span className="text-[10px] text-zinc-500">Text</span>
                      </div>
                    </div>
                  </div>

                  {/* Typography */}
                  <div>
                    <p className="text-xs text-zinc-500 font-medium mb-3 flex items-center gap-1"><Type className="w-3 h-3"/> Typography</p>
                    <div className="space-y-4 bg-zinc-950/50 rounded-xl p-4 border border-zinc-800/50">
                      <div>
                        <span className="text-[10px] uppercase text-zinc-600 block mb-1">Heading: {extractFontName(plan.font_heading)}</span>
                        <h4 className="text-lg text-zinc-200" style={{ fontFamily: `"${extractFontName(plan.font_heading)}", sans-serif` }}>
                          The quick brown fox
                        </h4>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-zinc-600 block mb-1">Body: {extractFontName(plan.font_body)}</span>
                        <p className="text-sm text-zinc-400" style={{ fontFamily: `"${extractFontName(plan.font_body)}", sans-serif` }}>
                          The quick brown fox jumps over the lazy dog.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Component Tree */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm"
              >
                <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 mb-6">
                  <Component className="w-4 h-4 text-sky-400" />
                  Component Hierarchy
                </h3>
                
                <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-800/50 font-mono text-sm relative">
                  {/* Decorative tree line */}
                  <div className="absolute left-[29px] top-[45px] bottom-[30px] w-px bg-zinc-800" />
                  
                  <div className="flex items-center gap-2 text-zinc-300 mb-3 font-semibold">
                    <LayoutTemplate className="w-4 h-4 text-zinc-500" /> App
                  </div>
                  
                  <div className="pl-5 space-y-2.5 relative">
                    {plan.sections && plan.sections.map((section, idx) => (
                      <div key={idx} className="flex items-center gap-3 group">
                        <div className="w-4 border-t border-zinc-800" />
                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800/80 px-3 py-1.5 rounded-lg text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition-colors shadow-sm w-full max-w-sm">
                          <ChevronRight className="w-3 h-3 opacity-50" />
                          {section}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
