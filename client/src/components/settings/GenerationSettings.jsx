import React from 'react';
import { Toggle } from '../ui/Toggle';

export function GenerationSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Generation Settings</h2>
        <p className="text-sm text-zinc-400">Tweak the AI generation behavior and output quality.</p>
      </div>

      <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Toggles */}
        <div className="space-y-6 relative z-10">
          <h3 className="text-sm font-semibold text-white mb-4">Automation</h3>
          
          {[
            { id: 'auto-fix', label: 'Auto Fix Errors', desc: 'Automatically attempt to fix syntax and runtime errors.' },
            { id: 'auto-retry', label: 'Auto Retry Failed Generations', desc: 'Retry up to 3 times if generation fails.' },
            { id: 'auto-save', label: 'Auto Save Projects', desc: 'Save generated code automatically to your workspace.' },
            { id: 'streaming', label: 'Enable Streaming', desc: 'See code as it is being generated line-by-line.' },
            { id: 'advanced-planner', label: 'Use Advanced Planner', desc: 'Plan complex UI architectures before generating.' }
          ].map(setting => (
            <div key={setting.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-200">{setting.label}</p>
                <p className="text-xs text-zinc-500">{setting.desc}</p>
              </div>
              <Toggle defaultChecked />
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-white/5 my-8 relative z-10" />

        {/* Sliders */}
        <div className="space-y-8 relative z-10">
          <h3 className="text-sm font-semibold text-white mb-4">Quality & Performance</h3>
          
          {[
            { label: 'Creativity (Temperature)', val: 70 },
            { label: 'Speed', val: 90 },
            { label: 'Code Quality', val: 80 }
          ].map((slider, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-zinc-300">{slider.label}</span>
                <span className="text-sm font-medium text-violet-400">{slider.val}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue={slider.val}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
