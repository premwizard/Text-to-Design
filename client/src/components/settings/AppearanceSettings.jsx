import React, { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../context/AuthContext';
import { settingsService } from '../../services/settingsService';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const THEMES = [
  { id: 'dark', label: 'Dark Mode', icon: Moon },
  { id: 'light', label: 'Light Mode', icon: Sun },
  { id: 'system', label: 'System', icon: Monitor },
];

const ACCENT_COLORS = [
  { id: 'purple', class: 'bg-purple-500' },
  { id: 'blue', class: 'bg-blue-500' },
  { id: 'green', class: 'bg-emerald-500' },
  { id: 'orange', class: 'bg-orange-500' },
  { id: 'pink', class: 'bg-pink-500' },
];

export function AppearanceSettings() {
  const [theme, setTheme] = useState(() => localStorage.getItem('app_theme') || 'dark');
  const [accent, setAccent] = useState(() => localStorage.getItem('app_accent') || 'purple');
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      settingsService.getSettings(user.id).then(data => {
        if (data && data.theme) {
          setTheme(data.theme);
        }
      }).catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    
    if (user?.id) {
      settingsService.updateSettings(user.id, { theme }).catch(console.error);
    }
  }, [theme, user]);

  useEffect(() => {
    localStorage.setItem('app_accent', accent);
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Appearance</h2>
        <p className="text-sm text-zinc-400">Customize the look and feel of your workspace.</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl space-y-8">
        
        {/* Theme Toggle */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Theme Preference</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {THEMES.map(t => {
              const Icon = t.icon;
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-300",
                    isActive 
                      ? "bg-violet-500/10 border-violet-500/50 text-violet-400" 
                      : "bg-black/40 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                  )}
                >
                  <Icon size={24} />
                  <span className="text-sm font-medium">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-white/5" />

        {/* Accent Color */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Accent Color</h3>
          <div className="flex gap-4">
            {ACCENT_COLORS.map(c => {
              const isActive = accent === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setAccent(c.id)}
                  className={cn(
                    "w-10 h-10 rounded-full transition-all duration-300 relative",
                    c.class,
                    isActive ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-110 shadow-lg" : "hover:scale-105 opacity-80 hover:opacity-100"
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border border-white/50" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
