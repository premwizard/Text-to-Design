import React from 'react';

export function EditorSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Editor Settings</h2>
        <p className="text-sm text-zinc-400">Customize the integrated code editor experience.</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl space-y-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Toggles */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white mb-4">Preferences</h3>
            
            {[
              { id: 'word-wrap', label: 'Word Wrap', checked: true },
              { id: 'auto-format', label: 'Auto Format', checked: true },
              { id: 'line-numbers', label: 'Line Numbers', checked: true },
              { id: 'minimap', label: 'Minimap', checked: false },
              { id: 'auto-save', label: 'Auto Save', checked: true }
            ].map(setting => (
              <div key={setting.id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-300">{setting.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={setting.checked} />
                  <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
              </div>
            ))}
          </div>

          {/* Dropdowns */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white mb-4">Appearance</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 block">Font Size</label>
              <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                <option value="12">12px</option>
                <option value="14" selected>14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="20">20px</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 block">Editor Theme</label>
              <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="midnight" selected>Midnight (Default)</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
