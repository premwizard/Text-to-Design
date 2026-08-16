import React from 'react';
import { MessageSquarePlus, Binary, Sparkles, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

export function GenerationProcess() {
  const steps = [
    {
      number: '01',
      title: 'Prompt Your Idea',
      subtitle: 'Natural Language Input',
      description: 'Describe your vision, page concept, or specific UI component in plain English (e.g., "Dark mode SaaS dashboard with analytics cards and side nav").',
      icon: MessageSquarePlus,
      color: 'from-sky-500 to-blue-600',
      badge: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      highlights: ['Plain text prompt', 'Preset template selection', 'Custom style specs'],
    },
    {
      number: '02',
      title: 'AI Parsing & Architecture',
      subtitle: 'Neural Layout Planner',
      description: 'Our backend orchestrator analyzes intent, breaks down design hierarchy, structures JSX component schema, and selects harmonized Tailwind tokens.',
      icon: Binary,
      color: 'from-indigo-500 to-sky-500',
      badge: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
      highlights: ['Design token mapping', 'Component hierarchy tree', 'Automated responsive grid'],
    },
    {
      number: '03',
      title: 'Real-Time Synthesis',
      subtitle: 'Live Code Execution',
      description: 'Watch the UI build live on your screen. Sanitize, validate, and render production-grade React components in an isolated browser sandbox.',
      icon: Sparkles,
      color: 'from-purple-500 to-indigo-500',
      badge: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      highlights: ['Instant visual preview', 'Interactive component test', 'Zero latency rendering'],
    },
    {
      number: '04',
      title: 'Refine & Export',
      subtitle: 'Production Code Ready',
      description: 'Make conversational tweaks to fine-tune layout or styles. Copy clean React + Tailwind code or export directly into your codebase.',
      icon: Download,
      color: 'from-emerald-500 to-teal-500',
      badge: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      highlights: ['One-click copy JSX', 'Chat-based fine-tuning', 'Clean, modular output'],
    },
  ];

  return (
    <section id="process" className="relative w-full py-28 px-6 bg-zinc-950/40 border-t border-b border-zinc-900/80 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-purple-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Sparkles size={14} className="text-purple-400" />
            <span>How It Works</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            The Step-by-Step <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
              Generation Process
            </span>
          </h2>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
            From a single sentence prompt to clean, full-stack React components—see how SynapseAI turns ideas into executable designs.
          </p>
        </div>

        {/* Pipeline Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/90 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
              >
                <div>
                  {/* Top bar with Step Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br ${step.color}`}>
                      {step.number}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${step.badge} shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Subtitle & Title */}
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                    {step.subtitle}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-zinc-800/60 space-y-2">
                  {step.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                      <CheckCircle2 size={13} className="text-sky-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Connecting arrow indicator for desktop (except last item) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-zinc-700 group-hover:text-sky-400 transition-colors">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
