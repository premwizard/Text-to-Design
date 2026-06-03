import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export function DangerZoneSettings() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Danger Zone</h2>
        <p className="text-sm text-zinc-400">Irreversible actions for your account.</p>
      </div>

      <div className="border border-rose-500/30 bg-rose-500/5 rounded-2xl p-6 backdrop-blur-xl">
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-500/10">
            <div>
              <h3 className="text-sm font-semibold text-white">Reset Settings</h3>
              <p className="text-xs text-zinc-400 mt-1">Restore all settings to their default values.</p>
            </div>
            <button className="px-4 py-2 bg-black/40 hover:bg-white/10 text-zinc-300 text-sm font-medium rounded-xl transition-colors border border-white/5 whitespace-nowrap">
              Reset to Default
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-500/10">
            <div>
              <h3 className="text-sm font-semibold text-white">Clear All Projects</h3>
              <p className="text-xs text-zinc-400 mt-1">Permanently delete all generated code and workspaces.</p>
            </div>
            <button className="px-4 py-2 bg-black/40 hover:bg-white/10 text-zinc-300 text-sm font-medium rounded-xl transition-colors border border-white/5 whitespace-nowrap">
              Clear Projects
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-rose-400">Delete Account</h3>
              <p className="text-xs text-rose-400/70 mt-1">Permanently remove your account and all data.</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-sm font-medium rounded-xl transition-colors border border-rose-500/30 whitespace-nowrap"
            >
              Delete Account
            </button>
          </div>

        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-zinc-950 border border-rose-500/30 rounded-3xl p-8 shadow-2xl relative">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
              <AlertTriangle className="text-rose-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Delete Account?</h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              This action cannot be undone. All your generated code, custom templates, and settings will be permanently lost.
            </p>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Type 'DELETE' to confirm" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-rose-500/20">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
