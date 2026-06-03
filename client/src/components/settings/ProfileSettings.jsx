import React from 'react';
import { Camera } from 'lucide-react';

export function ProfileSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Profile Settings</h2>
        <p className="text-sm text-zinc-400">Update your personal information and public profile.</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-white/10 overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="text-white w-6 h-6" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Profile Picture</h3>
            <p className="text-xs text-zinc-400 mb-3">PNG, JPG or GIF. Max 2MB.</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors">
                Upload New
              </button>
              <button className="px-4 py-2 text-rose-400 hover:bg-rose-500/10 text-sm font-medium rounded-xl transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 my-6" />

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Full Name</label>
            <input 
              type="text" 
              defaultValue="John Doe"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email Address</label>
            <input 
              type="email" 
              defaultValue="john@example.com"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-zinc-300">Bio</label>
            <textarea 
              rows={4}
              placeholder="Tell us a little about yourself..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button className="px-5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
