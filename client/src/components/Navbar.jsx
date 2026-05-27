import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Navbar({ logo = 'MyApp', links = [], actionLabel, actionUrl }) {
  const { theme, toggleTheme } = useTheme();
  const items = Array.isArray(links) ? links : [links];
  const isDark = theme === 'dark';

  return (
    <nav
      className={`flex flex-col gap-4 rounded-[1.5rem] border px-6 py-5 shadow-sm transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
        isDark
          ? 'bg-slate-950/95 border-slate-800 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-950'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold tracking-tight">{logo}</span>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
        {items.filter(Boolean).map((item, index) => {
          if (typeof item === 'object' && item.label) {
            return (
              <a key={index} href={item.url || '#'} className="transition hover:text-sky-500">
                {item.label}
              </a>
            );
          }

          return (
            <a key={index} href="#" className="transition hover:text-sky-500">
              {item}
            </a>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {actionLabel && (
          <a
            href={actionUrl || '#'}
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            {actionLabel}
          </a>
        )}

        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition hover:border-sky-500 hover:text-sky-500"
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
