import React from 'react';
import { Sparkles, Layout, Code2, Cpu, Paintbrush, ShieldCheck, Zap } from 'lucide-react';

export function ProductOverview() {
  const features = [
    {
      icon: Sparkles,
      iconColor: 'text-sky-400',
      badgeColor: 'bg-sky-500/10 border-sky-500/30 text-sky-300',
      glow: 'from-sky-500/20 to-blue-600/5',
      title: 'Text-to-UI AI Engine',
      description: 'Describe any web interface, landing page, dashboard, or app component in plain natural language, and watch our LLM orchestrator architect structured code instantly.',
    },
    {
      icon: Layout,
      iconColor: 'text-indigo-400',
      badgeColor: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300',
      glow: 'from-indigo-500/20 to-purple-600/5',
      title: 'Live Interactive Canvas',
      description: 'Preview generated wireframes and high-fidelity interfaces in a real-time, responsive sandbox with instant visual feedback and responsive breakdown.',
    },
    {
      icon: Code2,
      iconColor: 'text-emerald-400',
      badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      glow: 'from-emerald-500/20 to-teal-600/5',
      title: 'Production-Ready Export',
      description: 'Get clean, structured, modular React JSX components formatted with Tailwind CSS utilities. Copy directly into your codebase or download project bundles.',
    },
    {
      icon: Paintbrush,
      iconColor: 'text-purple-400',
      badgeColor: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
      glow: 'from-purple-500/20 to-pink-600/5',
      title: 'Iterative AI Conversational Editing',
      description: 'Refine colors, layout structures, typography, and component hierarchy on the fly using simple conversational prompts.',
    },
  ];

  const valuePoints = [
    { label: 'Speed', detail: 'From idea to UI in seconds' },
    { label: 'Quality', detail: 'Modern, accessible & responsive code' },
    { label: 'Flexibility', detail: 'Full code ownership with zero lock-in' },
  ];

  return (
    <section id="about" className="relative w-full py-28 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-sky-600/10 via-indigo-600/10 to-purple-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <Cpu size={14} className="text-sky-400" />
            <span>What Is SynapseAI?</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            The Next-Generation <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
              AI Web & Design Architect
            </span>
          </h2>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
            SynapseAI bridges the gap between raw imagination and production frontend code. Simply type what you want to build, and our AI constructs beautifully styled, modern web components in seconds.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-8 transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/60 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Subtle top glow line on hover */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex items-start gap-5">
                  <div className={`p-3.5 rounded-xl border ${feature.badgeColor} shadow-inner flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className={feature.iconColor} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Pill */}
        <div className="rounded-2xl border border-zinc-800/60 bg-gradient-to-r from-zinc-900/90 via-zinc-950/90 to-zinc-900/90 backdrop-blur-md p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Engineered for Developers, Designers & Founders</h4>
              <p className="text-zinc-400 text-sm">Eliminate boilerplate setup and speed up prototyping by 10x with production-ready JSX.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 divide-x divide-zinc-800 text-center shrink-0">
            {valuePoints.map((item, index) => (
              <div key={index} className={index > 0 ? 'pl-6' : ''}>
                <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider">{item.label}</div>
                <div className="text-xs text-zinc-300 font-medium mt-0.5">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
