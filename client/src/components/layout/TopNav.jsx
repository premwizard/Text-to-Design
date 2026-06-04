import React from 'react';
import { Sparkles, Settings, User, CreditCard } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function TopNav({ loading, projectName = 'Untitled Project' }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user || null;
  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-zinc-950/40 backdrop-blur-xl shrink-0 z-20 shadow-sm relative">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      
      <div className="flex items-center gap-5">
        {/* Logo */}
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_0_20px_rgba(139,92,246,0.3)] text-zinc-50 transform hover:scale-105 transition-transform cursor-pointer border border-white/10">
          <Sparkles size={22} className="text-white drop-shadow-md" />
        </div>
        
        {/* Project Name */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-display font-bold text-zinc-100 tracking-tight cursor-pointer hover:text-white transition-colors">
              {projectName}
            </h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Status Indicator */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
          <span className={cn(
            "w-2 h-2 rounded-full shadow-lg", 
            loading ? "bg-violet-400 animate-pulse shadow-violet-500/50" : "bg-zinc-500"
          )} />
          <span className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
            {loading ? 'Generating...' : 'Idle'}
          </span>
        </div>

   

        {/* Divider */}
        <div className="w-px h-8 bg-white/10 mx-2" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/settings')} className="text-zinc-400 hover:text-white transition-colors p-2.5 rounded-xl hover:bg-white/10">
            <Settings size={22} />
          </button>
          <button 
            onClick={() => navigate('/profile')} 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 border border-white/10 text-white hover:border-white/20 transition-all shadow-md ml-1 font-bold text-lg"
          >
            {user?.email ? user.email[0].toUpperCase() : <User size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
