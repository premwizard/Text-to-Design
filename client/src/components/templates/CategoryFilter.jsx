import React from 'react';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const CATEGORIES = [
  'All',
  'Landing Pages',
  'SaaS',
  'Dashboard',
  'E-Commerce',
  'Portfolio',
  'AI Apps',
  'Mobile Apps',
  'Agency',
  'Restaurant',
  'Blog',
  'Healthcare',
  'Education'
];

export function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex items-center gap-2 px-1">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onChange(category)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-violet-600 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
