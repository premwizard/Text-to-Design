import React, { useEffect, useState } from 'react';
import { 
  Database, 
  Sparkles, 
  Sliders, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  Palette, 
  Layout, 
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function PersonalizationCard({ userId }) {
  const [memory, setMemory] = useState(null);
  const [resolved, setResolved] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchMemory = async () => {
    try {
      const response = await fetch(`/user-memory?userId=${userId || ''}`);
      if (response.ok) {
        const data = await response.json();
        setMemory(data.memory);
        setResolved(data.resolved);
        setEnabled(data.memory?.settings?.enabled ?? true);
      }
    } catch (err) {
      console.error("Failed to load user design memory:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemory();
  }, [userId]);

  const togglePersonalization = async () => {
    setUpdating(true);
    try {
      const nextEnabled = !enabled;
      const response = await fetch(`/user-memory/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, enabled: nextEnabled })
      });
      if (response.ok) {
        const data = await response.json();
        setEnabled(nextEnabled);
        setMemory(data.memory);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const resetMemory = async () => {
    if (!window.confirm("Are you sure you want to clear your AI design personalization memory?")) {
      return;
    }
    setUpdating(true);
    try {
      const response = await fetch(`/user-memory/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, reset: true })
      });
      if (response.ok) {
        const data = await response.json();
        setMemory(data.memory);
        setResolved({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const hasHistory = memory?.history && memory.history.length > 0;

  return (
    <div className="w-full bg-zinc-900/40 border border-zinc-850 backdrop-blur-xl rounded-2xl p-6 shadow-xl relative overflow-hidden text-left">
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-850">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl">
            <UserCheck className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-150 tracking-wide uppercase">AI Design Profile</h3>
            <p className="text-xs text-zinc-500 mt-0.5 font-medium">Automatic design tailoring based on your history</p>
          </div>
        </div>

        {/* Toggle option */}
        <div className="flex items-center gap-4">
          <button
            onClick={togglePersonalization}
            disabled={updating}
            className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-zinc-200 transition-colors text-xs font-semibold focus:outline-none"
          >
            {enabled ? (
              <>
                <span className="text-violet-400">Personalization Active</span>
                <ToggleRight className="w-8 h-8 text-violet-500" />
              </>
            ) : (
              <>
                <span className="text-zinc-550">Personalization Paused</span>
                <ToggleLeft className="w-8 h-8 text-zinc-650" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Profile Metrics grid */}
      {loading ? (
        <div className="flex items-center gap-2 py-8 justify-center text-zinc-500 text-xs font-medium">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          Loading profile...
        </div>
      ) : (
        <div className="mt-5 space-y-6">
          {enabled && hasHistory ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-950/40 border border-zinc-850/60 p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] text-zinc-550 uppercase tracking-wider font-bold">Preferred Theme</span>
                <p className="text-xs font-semibold text-zinc-300 capitalize">{resolved?.theme || 'Default'}</p>
              </div>

              <div className="bg-zinc-950/40 border border-zinc-850/60 p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] text-zinc-550 uppercase tracking-wider font-bold">Favorite Layout</span>
                <p className="text-xs font-semibold text-zinc-300 capitalize truncate">{resolved?.layoutPattern?.replace(/-/g, ' ') || 'Centered grid'}</p>
              </div>

              <div className="bg-zinc-950/40 border border-zinc-850/60 p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] text-zinc-550 uppercase tracking-wider font-bold">Accent Color</span>
                {resolved?.primaryColor ? (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: resolved.primaryColor === 'indigo' ? '#6366f1' : resolved.primaryColor === 'violet' ? '#8b5cf6' : resolved.primaryColor === 'emerald' ? '#10b981' : resolved.primaryColor === 'yellow' ? '#f59e0b' : '#3b82f6' }} />
                    <span className="text-xs font-semibold text-zinc-300 capitalize">{resolved.primaryColor}</span>
                  </div>
                ) : (
                  <p className="text-xs font-semibold text-zinc-300">Default</p>
                )}
              </div>

              <div className="bg-zinc-950/40 border border-zinc-850/60 p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] text-zinc-550 uppercase tracking-wider font-bold">Corner Radius</span>
                <p className="text-xs font-semibold text-zinc-300 capitalize">{resolved?.borderRadius?.replace('rounded-', '') || 'Rounded XL'}</p>
              </div>
            </div>
          ) : (
            <div className="py-2 text-center">
              <p className="text-xs text-zinc-500 font-medium">
                {enabled 
                  ? "No design preferences recorded yet. Generate UIs to build your customized profile!" 
                  : "Personalization is paused. Toggle it active to use memory profiles."}
              </p>
            </div>
          )}

          {/* Reset Action */}
          {hasHistory && (
            <div className="flex justify-end pt-1">
              <button
                onClick={resetMemory}
                disabled={updating}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-rose-400 hover:text-rose-350 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 rounded-lg cursor-pointer transition-all focus:outline-none"
              >
                <Trash2 size={12} />
                Reset AI Memory
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
