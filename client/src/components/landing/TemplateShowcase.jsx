import React, { useState } from 'react';
import { Layers, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TemplateShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'SaaS', 'Landing', 'E-Commerce', 'Portfolio'];

  const templates = [
    {
      id: 'template-1',
      title: 'Dark SaaS Command Dashboard',
      category: 'SaaS',
      badge: 'Popular',
      badgeColor: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      description: 'Complete admin control center with metrics overview, side navigation, and interactive table components.',
      gradient: 'from-sky-500/20 to-blue-600/10',
    },
    {
      id: 'template-2',
      title: 'AI Startup Hero & Landing',
      category: 'Landing',
      badge: 'Trending',
      badgeColor: 'bg-sky-500/10 border-sky-500/30 text-sky-300',
      description: 'High-converting tech landing page with glowing hero section, feature cards, pricing grid, and footer.',
      gradient: 'from-indigo-500/20 to-purple-600/10',
    },
    {
      id: 'template-3',
      title: 'Minimalist Storefront Grid',
      category: 'E-Commerce',
      badge: 'New',
      badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      description: 'Clean product catalog with filtering sidebar, product details modal, and cart drawer.',
      gradient: 'from-emerald-500/20 to-teal-600/10',
    },
    {
      id: 'template-4',
      title: 'Developer Portfolio & Showcase',
      category: 'Portfolio',
      badge: 'Featured',
      badgeColor: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
      description: 'Modern personal website layout with project gallery, skills stack, work experience timeline, and contact card.',
      gradient: 'from-purple-500/20 to-pink-600/10',
    },
  ];

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  return (
    <section id="templates" className="relative w-full py-28 px-6 bg-zinc-950/60 border-t border-zinc-900/80 overflow-hidden">
      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Layers size={14} className="text-emerald-400" />
            <span>Ready-to-Use Templates</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Jumpstart Projects with <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-300 to-indigo-400">
              Curated UI Starter Kits
            </span>
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Select a pre-architected template and use natural language prompts to customize components, colors, and layout structure instantly.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          <div className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mr-2 flex items-center gap-1">
            <Filter size={12} /> Filter:
          </div>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${template.gradient} pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full border text-[11px] font-bold ${template.badgeColor}`}>
                    {template.badge}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">{template.category}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {template.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {template.description}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                  <Sparkles size={12} className="text-sky-400" />
                  Fully Prompt Editable
                </span>

                <Link
                  to="/app"
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  Use Template
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
