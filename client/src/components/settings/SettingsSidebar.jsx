import React from 'react';
import { motion } from 'framer-motion';
import { User, Palette, Bot, Zap, Code2, Bell, Keyboard, CreditCard, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const SETTINGS_SECTIONS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'ai-models', label: 'AI Models', icon: Bot },
  { id: 'generation', label: 'Generation', icon: Zap },
  { id: 'editor', label: 'Editor', icon: Code2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'shortcuts', label: 'Keyboard Shortcuts', icon: Keyboard },
  { id: 'billing', label: 'Billing & Usage', icon: CreditCard },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, danger: true },
];

export function SettingsSidebar({ activeSection, onSelect }) {
  return (
    <nav className="w-full shrink-0 flex flex-col gap-1.5 p-2 bg-black/20 rounded-3xl border border-white/5 backdrop-blur-xl">
      {SETTINGS_SECTIONS.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => onSelect(section.id)}
            className={cn(
              "relative flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 text-left overflow-hidden group",
              isActive
                ? section.danger ? "text-rose-400" : "text-white"
                : "text-zinc-400 hover:text-white"
            )}
          >
            {!isActive && (
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            )}
            {isActive && (
              <motion.div
                layoutId="activeSettingsTab"
                className={cn(
                  "absolute inset-0 rounded-2xl",
                  section.danger 
                    ? "bg-rose-500/10 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]" 
                    : "bg-white/10 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                )}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon size={18} className="relative z-10" />
            <span className="relative z-10">{section.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
