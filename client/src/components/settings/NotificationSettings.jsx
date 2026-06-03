import React from 'react';
import { Bell, ShieldAlert, Zap } from 'lucide-react';

export function NotificationSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Notifications</h2>
        <p className="text-sm text-zinc-400">Manage what events trigger alerts.</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl space-y-8">
        
        <div className="space-y-5">
          {[
            { id: 'gen-complete', label: 'Generation Complete', desc: 'Notify when AI finishes writing code.', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            { id: 'build-fail', label: 'Build Failed', desc: 'Alert when a syntax error breaks the preview.', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-400/10' },
            { id: 'new-templates', label: 'New Templates', desc: 'Get notified when new templates are added.', icon: Bell, color: 'text-violet-400', bg: 'bg-violet-400/10' },
            { id: 'updates', label: 'Product Updates', desc: 'News about feature releases and improvements.', icon: Bell, color: 'text-blue-400', bg: 'bg-blue-400/10' }
          ].map(setting => {
            const Icon = setting.icon;
            return (
              <div key={setting.id} className="flex items-start justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex gap-4">
                  <div className={`p-2 rounded-lg ${setting.bg} ${setting.color} mt-0.5`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{setting.label}</p>
                    <p className="text-xs text-zinc-500 mt-1">{setting.desc}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
