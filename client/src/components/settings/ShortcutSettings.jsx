import React from 'react';
import { Keyboard } from 'lucide-react';

export function ShortcutSettings() {
  const shortcuts = [
    { action: 'Generate UI', keys: ['Ctrl', 'Enter'] },
    { action: 'Save Project', keys: ['Ctrl', 'S'] },
    { action: 'Search Files', keys: ['Ctrl', 'P'] },
    { action: 'Toggle Theme', keys: ['Ctrl', 'Shift', 'D'] },
    { action: 'Toggle Sidebar', keys: ['Ctrl', 'B'] },
    { action: 'Clear Chat', keys: ['Ctrl', 'L'] },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Keyboard Shortcuts</h2>
          <p className="text-sm text-zinc-400">Boost your workflow with these hotkeys.</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-violet-400 hover:text-white bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 rounded-xl transition-colors">
          Edit Shortcuts
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
        
        <div className="divide-y divide-white/5">
          {shortcuts.map((shortcut, idx) => (
            <div key={idx} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group hover:bg-white/5 px-2 -mx-2 rounded-lg transition-colors cursor-default">
              <span className="text-sm font-medium text-zinc-300 pl-2">{shortcut.action}</span>
              <div className="flex gap-1.5 pr-2">
                {shortcut.keys.map((key, i) => (
                  <kbd 
                    key={i} 
                    className="px-2.5 py-1 text-xs font-mono font-semibold text-zinc-400 bg-black/40 border border-white/10 rounded-md shadow-sm"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
