/* eslint-disable no-unused-vars, no-empty, no-self-assign */
import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { useTheme } from '../context/ThemeContext';

export function NavbarStandard({ logo = 'MyApp', links = [], actionLabel, actionUrl, action }) {
  const { theme, palette, handleAction } = useDesignSystem();
  const { toggleTheme, theme: currentThemeMode } = useTheme();
  const items = Array.isArray(links) ? links : [links];

  return (
    <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 py-4 border border-[var(--secondary)]/30 bg-[var(--surface)] text-[var(--text)] rounded-[var(--radius)] transition-colors duration-300">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold tracking-tight text-[var(--primary)]">{logo}</span>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
        {items.filter(Boolean).map((item, index) => {
          const label = typeof item === 'object' && item.label ? item.label : String(item);
          const linkAction = typeof item === 'object' ? item.action || { type: 'navigate', target: item.url } : { type: 'navigate', target: '#' };
          return (
            <button 
              key={index} 
              onClick={() => handleAction(linkAction)}
              className="transition-colors duration-200 text-[var(--text)]/80 hover:text-[var(--primary)] font-medium"
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {actionLabel && (
          <button
            onClick={() => handleAction(action || { type: 'navigate', target: actionUrl })}
            className="bg-[var(--primary)] text-[var(--background)] px-5 py-2 text-sm font-semibold rounded-[var(--radius)] transition hover:opacity-90 active:scale-[0.98]"
          >
            {actionLabel}
          </button>
        )}
        <button
          type="button"
          onClick={toggleTheme}
          className="border border-[var(--secondary)]/40 text-xs px-3 py-1.5 rounded-[var(--radius)] hover:bg-[var(--secondary)]/10 text-[var(--text)]"
        >
          {currentThemeMode === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

export function NavbarSticky({ logo = 'MyApp', links = [], actionLabel, actionUrl, action }) {
  const { handleAction } = useDesignSystem();
  const { toggleTheme } = useTheme();
  const items = Array.isArray(links) ? links : [links];

  return (
    <nav className="sticky top-4 z-50 flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3 border border-[var(--secondary)]/20 backdrop-blur-lg bg-[var(--surface)]/70 text-[var(--text)] rounded-[var(--radius)] shadow-lg transition-colors duration-300">
      <div>
        <span className="text-xl font-black tracking-tight text-[var(--primary)]">{logo}</span>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm">
        {items.filter(Boolean).map((item, index) => {
          const label = typeof item === 'object' && item.label ? item.label : String(item);
          const linkAction = typeof item === 'object' ? item.action || { type: 'navigate', target: item.url } : { type: 'navigate', target: '#' };
          return (
            <button key={index} onClick={() => handleAction(linkAction)} className="hover:text-[var(--primary)] transition-colors duration-200">
              {label}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        {actionLabel && (
          <button 
            onClick={() => handleAction(action || { type: 'navigate', target: actionUrl })} 
            className="bg-[var(--primary)] text-[var(--background)] px-4 py-1.5 text-xs font-bold rounded-[var(--radius)] active:scale-[0.98] transition-transform"
          >
            {actionLabel}
          </button>
        )}
        <button onClick={toggleTheme} className="p-1.5 border border-[var(--secondary)]/30 rounded-full hover:bg-[var(--secondary)]/10 text-[var(--text)]">
          ✨
        </button>
      </div>
    </nav>
  );
}

export function NavbarMinimal({ logo = 'MyApp', links = [], actionLabel, actionUrl, action }) {
  const { handleAction } = useDesignSystem();
  const items = Array.isArray(links) ? links : [links];

  return (
    <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-[var(--secondary)]/30 bg-transparent text-[var(--text)]">
      <span className="text-lg font-mono uppercase tracking-widest text-[var(--text)]">{logo}</span>
      <div className="flex flex-wrap gap-8 text-xs uppercase tracking-widest">
        {items.filter(Boolean).map((item, index) => {
          const label = typeof item === 'object' && item.label ? item.label : String(item);
          const linkAction = typeof item === 'object' ? item.action || { type: 'navigate', target: item.url } : { type: 'navigate', target: '#' };
          return (
            <button key={index} onClick={() => handleAction(linkAction)} className="hover:underline">
              {label}
            </button>
          );
        })}
      </div>
      {actionLabel && (
        <button 
          onClick={() => handleAction(action || { type: 'navigate', target: actionUrl })} 
          className="underline text-xs uppercase tracking-wider hover:text-[var(--primary)]"
        >
          {actionLabel}
        </button>
      )}
    </nav>
  );
}

export default function Navbar(props) {
  const { variant = 'standard' } = props;
  if (variant === 'sticky') return <NavbarSticky {...props} />;
  if (variant === 'minimal') return <NavbarMinimal {...props} />;
  return <NavbarStandard {...props} />;
}
