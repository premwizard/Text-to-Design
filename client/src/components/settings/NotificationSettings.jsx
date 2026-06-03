import React from 'react';
import { Bell, ShieldAlert, Zap } from 'lucide-react';
import { Toggle } from '../ui/Toggle';

export function NotificationSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Notifications</h2>
        <p className="text-sm text-zinc-400">Manage what events trigger alerts.</p>
      </div>

      <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="space-y-4 relative z-10">
          {[
            { id: 'gen-complete', label: 'Generation Complete', desc: 'Notify when AI finishes writing code.', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            { id: 'build-fail', label: 'Build Failed', desc: 'Alert when a syntax error breaks the preview.', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-400/10' },
            { id: 'new-templates', label: 'New Templates', desc: 'Get notified when new templates are added.', icon: Bell, color: 'text-violet-400', bg: 'bg-violet-400/10' },
            { id: 'updates', label: 'Product Updates', desc: 'News about feature releases and improvements.', icon: Bell, color: 'text-blue-400', bg: 'bg-blue-400/10' }
          ].map(setting => {
            const Icon = setting.icon;
            return (
              <div key={setting.id} className="flex items-start justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className={`p-2.5 rounded-xl ${setting.bg} ${setting.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-200 mb-0.5">{setting.label}</p>
                    <p className="text-xs text-zinc-500">{setting.desc}</p>
                  </div>
                </div>
                <Toggle defaultChecked />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
