import React, { useEffect, useState } from 'react';
import { Toggle } from '../ui/Toggle';
import { useAuth } from '../../context/AuthContext';
import { settingsService } from '../../services/settingsService';

export function EditorSettings() {
  const { user } = useAuth();
  const [fontSize, setFontSize] = useState(14);
  const [autoSave, setAutoSave] = useState(true);

  useEffect(() => {
    if (user?.id) {
      settingsService.getSettings(user.id).then(data => {
        if (data) {
          if (data.editor_font_size) setFontSize(data.editor_font_size);
          if (data.auto_save !== undefined) setAutoSave(data.auto_save);
        }
      }).catch(console.error);
    }
  }, [user]);

  const handleFontSizeChange = (val) => {
    const size = parseInt(val);
    setFontSize(size);
    if (user?.id) {
      settingsService.updateSettings(user.id, { editor_font_size: size }).catch(console.error);
    }
  };

  const handleAutoSaveToggle = (val) => {
    setAutoSave(val);
    if (user?.id) {
      settingsService.updateSettings(user.id, { auto_save: val }).catch(console.error);
    }
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Editor Settings</h2>
        <p className="text-sm text-zinc-400">Customize the integrated code editor experience.</p>
      </div>

      <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          {/* Toggles */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white mb-4">Preferences</h3>
            
            {[
              { id: 'word-wrap', label: 'Word Wrap', checked: true },
              { id: 'auto-format', label: 'Auto Format', checked: true },
              { id: 'line-numbers', label: 'Line Numbers', checked: true },
              { id: 'minimap', label: 'Minimap', checked: false },
              { id: 'auto-save', label: 'Auto Save' }
            ].map(setting => (
              <div key={setting.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors -mx-3">
                <span className="text-sm font-medium text-zinc-300">{setting.label}</span>
                <Toggle 
                  defaultChecked={setting.id === 'auto-save' ? autoSave : true} 
                  onChange={(val) => setting.id === 'auto-save' && handleAutoSaveToggle(val)} 
                />
              </div>
            ))}
          </div>

          {/* Dropdowns */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white mb-6">Appearance</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 block">Font Size</label>
              <select 
                value={fontSize} 
                onChange={(e) => handleFontSizeChange(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                <option value="12">12px</option>
                <option value="14">14px</option>
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
