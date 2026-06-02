import React from 'react';
import { Sparkles, Settings, User, CreditCard } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function TopNav({ loading, projectName = 'Untitled Project' }) {
  return (
    <header className="h-14 border-b border-zinc-800/80 flex items-center justify-between px-4 bg-zinc-950/80 backdrop-blur-md shrink-0 z-20">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-500 to-indigo-500 shadow-md shadow-violet-500/20 text-zinc-50">
          <Sparkles size={28} className="text-white" />
        </div>
        
        {/* Project Name */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-zinc-100 tracking-tight cursor-pointer hover:text-zinc-50 transition-colors">
              {projectName}
            </h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
          <span className={cn("w-2 h-2 rounded-full", loading ? "bg-violet-500 animate-pulse" : "bg-zinc-600")} />
          <span className="text-xs font-medium text-zinc-400">
            {loading ? 'Generating...' : 'Idle'}
          </span>
        </div>

        {/* Credits Counter */}
        <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer text-sm font-medium mr-2">
          <CreditCard size={20} />
          <span>24 Credits</span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-zinc-800" />

        {/* Actions */}
        <button className="text-zinc-400 hover:text-zinc-200 transition-colors p-2 rounded-xl hover:bg-zinc-900">
          <Settings size={22} />
        </button>
        <button className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-colors">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}
