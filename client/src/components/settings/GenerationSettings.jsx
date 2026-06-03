import React from 'react';

export function GenerationSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Generation Settings</h2>
        <p className="text-sm text-zinc-400">Tweak the AI generation behavior and output quality.</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl space-y-8">
        
        {/* Toggles */}
        <div className="space-y-4">
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
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-white/5" />

        {/* Sliders */}
        <div className="space-y-6">
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
