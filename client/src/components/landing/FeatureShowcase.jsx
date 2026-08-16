import React, { useState } from 'react';
import { Sparkles, Code2, Eye, LayoutGrid, Terminal, CheckCircle } from 'lucide-react';

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'code'

  const showcases = [
    {
      id: 'dashboard',
      title: 'SaaS Analytics Dashboard',
      prompt: 'Create a sleek dark mode SaaS dashboard with MRR metrics card, active user chart, and recent transaction table',
      category: 'Dashboard',
      code: `export function AnalyticsDashboard() {
  return (
    <div className="bg-zinc-950 text-white p-6 rounded-2xl border border-zinc-800 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Analytics Overview</h2>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full">+18.4% growth</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Total Revenue" value="$128,420" change="+12%" />
        <MetricCard label="Active Users" value="14,890" change="+24%" />
        <MetricCard label="Conversion" value="3.42%" change="+2.1%" />
      </div>
    </div>
  );
}`,
      renderPreview: () => (
        <div className="bg-zinc-950 text-white p-6 rounded-xl border border-zinc-800/80 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
            <div>
              <h4 className="text-lg font-bold">Analytics Overview</h4>
              <p className="text-xs text-zinc-400">Real-time performance metrics</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Sync
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
              <div className="text-xs text-zinc-400 font-medium">Monthly Revenue</div>
              <div className="text-2xl font-bold text-white mt-1">$128,420</div>
              <div className="text-xs text-emerald-400 mt-1 font-medium">↑ +14.2% vs last month</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
              <div className="text-xs text-zinc-400 font-medium">Active Subscribers</div>
              <div className="text-2xl font-bold text-white mt-1">14,890</div>
              <div className="text-xs text-emerald-400 mt-1 font-medium">↑ +22.8% new users</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
              <div className="text-xs text-zinc-400 font-medium">Avg. Response Time</div>
              <div className="text-2xl font-bold text-white mt-1">42 ms</div>
              <div className="text-xs text-sky-400 mt-1 font-medium">Optimal latency</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-3 font-medium">
              <span>Recent Activity</span>
              <span>Status</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Enterprise Plan Renewal', user: 'acme_corp', amount: '+$2,400', status: 'Completed' },
                { name: 'Pro Tier Upgrade', user: 'dev_team', amount: '+$290', status: 'Completed' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-zinc-900/80">
                  <div className="font-medium text-zinc-200">{item.name} <span className="text-zinc-500 font-normal">(@{item.user})</span></div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-emerald-400">{item.amount}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'landing',
      title: 'Modern AI Hero Section',
      prompt: 'Design a high-converting hero section with vibrant gradient background, CTA button, and social proof badges',
      category: 'Landing Page',
      code: `export function HeroSection() {
  return (
    <section className="text-center py-20 bg-zinc-950">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-400 text-sm mb-6">
        🚀 Next-Gen Web Builder
      </div>
      <h1 className="text-5xl font-black text-white">Build Web Apps Faster</h1>
      <button className="mt-8 bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-3 rounded-xl">
        Get Started Free
      </button>
    </section>
  );
}`,
      renderPreview: () => (
        <div className="bg-zinc-950 text-white p-8 rounded-xl border border-zinc-800/80 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 blur-xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-semibold">
            <Sparkles size={14} className="text-sky-400" />
            <span>Next-Gen Web Builder</span>
          </div>

          <h3 className="text-3xl font-extrabold tracking-tight text-white max-w-xl mx-auto leading-tight">
            Build Stunning Interfaces at <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">10x Speed</span>
          </h3>

          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Transform ideas into clean, production-ready React code instantly using artificial intelligence.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-sky-500/20 hover:opacity-90">
              Start Free Trial
            </button>
            <button className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-semibold hover:text-white">
              View Components
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'ecommerce',
      title: 'Minimalist E-Commerce Card',
      prompt: 'Create a clean e-commerce product card with product image, price badge, rating stars, and add to cart action',
      category: 'Components',
      code: `export function ProductCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
      <div className="h-48 bg-zinc-800 rounded-xl mb-4" />
      <h3 className="font-bold text-white">Wireless Noise-Canceling Headphones</h3>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xl font-extrabold text-sky-400">$299</span>
        <button className="bg-white text-black font-bold px-4 py-2 rounded-xl text-xs">Add to Cart</button>
      </div>
    </div>
  );
}`,
      renderPreview: () => (
        <div className="bg-zinc-950 text-white p-6 rounded-xl border border-zinc-800/80 max-w-md mx-auto shadow-2xl">
          <div className="relative h-44 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-zinc-800/80 mb-4 overflow-hidden group">
            <div className="w-20 h-20 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-black text-xl shadow-lg">
              🎧
            </div>
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-sky-500 text-black font-extrabold text-[10px] tracking-wider uppercase">
              New Arrival
            </span>
          </div>

          <h4 className="font-bold text-base text-white mb-1">Pro Wireless Spatial Headphones</h4>
          <p className="text-zinc-400 text-xs mb-4">Active Noise Cancellation & 40-hour battery life.</p>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase font-semibold">Price</div>
              <div className="text-xl font-black text-sky-400">$299.00</div>
            </div>
            <button className="px-5 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors shadow-md">
              Add to Cart
            </button>
          </div>
        </div>
      ),
    },
  ];

  const current = showcases[activeTab];

  return (
    <section id="showcase" className="relative w-full py-28 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <LayoutGrid size={14} className="text-sky-400" />
            <span>Interactive Demo Showcase</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            See What You Can <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
              Generate in Seconds
            </span>
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Click through real prompt examples below to toggle between instant visual UI rendering and clean output React JSX code.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {showcases.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 border ${
                activeTab === idx
                  ? 'bg-sky-500 text-black border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)] font-bold'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Prompt Input Preview Bar */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 w-full">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
              <Sparkles size={18} />
            </div>
            <div className="text-xs md:text-sm text-zinc-200 font-mono truncate">
              <span className="text-zinc-500 mr-2">PROMPT &gt;</span>
              "{current.prompt}"
            </div>
          </div>

          {/* View Switcher (Preview / Code) */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'preview' ? 'bg-sky-500 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Eye size={14} />
              Preview UI
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'code' ? 'bg-sky-500 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code2 size={14} />
              JSX Code
            </button>
          </div>
        </div>

        {/* Content Box (UI Preview vs Code) */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl p-6 md:p-10 min-h-[340px] flex items-center justify-center shadow-2xl">
          {viewMode === 'preview' ? (
            <div className="w-full max-w-2xl animate-fade-in">
              {current.renderPreview()}
            </div>
          ) : (
            <div className="w-full font-mono text-xs md:text-sm text-sky-300 bg-zinc-950 p-6 rounded-xl border border-zinc-800/80 overflow-x-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-zinc-500 text-xs">
                <span className="flex items-center gap-2">
                  <Terminal size={14} className="text-sky-400" />
                  GeneratedReactComponent.jsx
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle size={12} /> Clean Tailwind JSX
                </span>
              </div>
              <pre className="leading-relaxed">
                <code>{current.code}</code>
              </pre>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
