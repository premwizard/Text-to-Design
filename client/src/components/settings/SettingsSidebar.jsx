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
    <nav className="w-full md:w-64 shrink-0 flex flex-col gap-1">
      {SETTINGS_SECTIONS.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => onSelect(section.id)}
            className={cn(
              "relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left",
              isActive
                ? section.danger ? "text-rose-400" : "text-white"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeSettingsTab"
                className={cn(
                  "absolute inset-0 rounded-xl",
                  section.danger ? "bg-rose-500/10 border border-rose-500/20" : "bg-white/10 border border-white/5"
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
