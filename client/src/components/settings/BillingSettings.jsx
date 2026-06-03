import React from 'react';
import { CreditCard, Zap, FolderOpen, LayoutTemplate } from 'lucide-react';

export function BillingSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Billing & Usage</h2>
        <p className="text-sm text-zinc-400">Monitor your plan and resource consumption.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Credits Card */}
        <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <Zap size={100} />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-violet-400 mb-1">
              <CreditCard size={18} />
              <h3 className="text-sm font-semibold uppercase tracking-wider">Credits</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-display font-bold text-white">78</span>
              <span className="text-zinc-400 pb-1">/ 100</span>
            </div>
            
            <div className="w-full bg-black/40 rounded-full h-2">
              <div className="bg-violet-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <p className="text-xs text-zinc-400">Resets in 14 days</p>
          </div>
        </div>

        {/* Generations Card */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 text-zinc-400 mb-1">
            <Zap size={18} />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Generations Today</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-display font-bold text-white">145</span>
            <span className="text-zinc-500 pb-1">/ 500</span>
          </div>
          <div className="w-full bg-black/40 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '29%' }}></div>
          </div>
        </div>

        {/* Projects Card */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 text-zinc-400 mb-1">
            <FolderOpen size={18} />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Projects Created</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-display font-bold text-white">12</span>
            <span className="text-zinc-500 pb-1">/ Unlimited</span>
          </div>
        </div>

        {/* Templates Card */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 text-zinc-400 mb-1">
            <LayoutTemplate size={18} />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Templates Used</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-display font-bold text-white">8</span>
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-2">
        <button className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 text-sm font-bold rounded-xl shadow-lg transition-colors">
          Upgrade Plan
        </button>
      </div>

    </div>
  );
}
