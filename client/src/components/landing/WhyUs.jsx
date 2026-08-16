import React from 'react';
import { Zap, X, Check, Scale } from 'lucide-react';

export function WhyUs() {
  const comparisons = [
    {
      feature: 'Development Velocity',
      traditional: 'Hours spent setting up layout grids, styling components, and writing boilerplate',
      synapse: 'Instant component generation from natural language prompt in seconds',
    },
    {
      feature: 'Code Quality & Styling',
      traditional: 'Inconsistent CSS naming, manual media queries, messy utility classes',
      synapse: 'Clean, modular React JSX formatted with standardized Tailwind CSS design tokens',
    },
    {
      feature: 'UI Iteration & Fine-Tuning',
      traditional: 'Manual editing across multiple CSS files, HTML markup, and JavaScript files',
      synapse: 'Conversational chat editing to alter colors, typography, or layout instantly',
    },
    {
      feature: 'Responsiveness & Accessibility',
      traditional: 'Tedious mobile breakpoint testing and manual aria-label implementations',
      synapse: 'Built-in responsive grid system and accessible semantic HTML standards',
    },
    {
      feature: 'Vendor Lock-in',
      traditional: 'Proprietary drag-and-drop website builder formats with non-exportable code',
      synapse: '100% clean code export—copy React JSX directly into your existing project',
    },
  ];

  return (
    <section className="relative w-full py-28 px-6 border-t border-zinc-900/80 overflow-hidden">
      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <Scale size={14} className="text-sky-400" />
            <span>Why Choose SynapseAI?</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            The Smart Way to <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
              Build Modern Web Interfaces
            </span>
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Compare traditional manual frontend development with SynapseAI's intelligent text-to-design workflow.
          </p>
        </div>

        {/* Comparison Table Grid */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-zinc-900/80 border-b border-zinc-800 p-4 md:p-6 text-sm font-bold">
            <div className="md:col-span-4 text-zinc-400">Feature / Dimension</div>
            <div className="md:col-span-4 text-rose-400 flex items-center gap-2 mt-2 md:mt-0">
              <X size={16} /> Traditional Coding
            </div>
            <div className="md:col-span-4 text-sky-400 flex items-center gap-2 mt-2 md:mt-0">
              <Zap size={16} fill="currentColor" /> SynapseAI Engine
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-zinc-800/60">
            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-6 items-start gap-4 hover:bg-zinc-900/40 transition-colors"
              >
                <div className="md:col-span-4 font-bold text-white text-sm md:text-base">
                  {row.feature}
                </div>

                <div className="md:col-span-4 text-xs md:text-sm text-zinc-400 flex items-start gap-2">
                  <span className="p-1 rounded bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
                    <X size={12} />
                  </span>
                  <span>{row.traditional}</span>
                </div>

                <div className="md:col-span-4 text-xs md:text-sm text-sky-200 font-medium flex items-start gap-2">
                  <span className="p-1 rounded bg-sky-500/10 text-sky-400 shrink-0 mt-0.5">
                    <Check size={12} />
                  </span>
                  <span>{row.synapse}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
