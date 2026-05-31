import React from 'react';

export function BackgroundDecorator({ type = 'none', className = '' }) {
  if (type === 'none') return null;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}>
      {type === 'grid' && (
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] text-slate-400 dark:text-slate-200"
          style={{
            backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {type === 'dots' && (
        <div 
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] text-slate-400 dark:text-slate-200"
          style={{
            backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {type === 'blobs' && (
        <div className="absolute inset-0 opacity-15 dark:opacity-25">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--primary)] rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[var(--secondary)] rounded-full blur-[120px]" />
        </div>
      )}

      {type === 'mesh' && (
        <div className="absolute inset-0 opacity-20 dark:opacity-30 bg-gradient-to-tr from-[var(--primary)]/10 via-[var(--secondary)]/0 to-[var(--secondary)]/10">
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[var(--primary)] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[var(--secondary)] rounded-full blur-[150px]" />
        </div>
      )}

      {type === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--secondary)]/5 to-transparent opacity-50" />
      )}
    </div>
  );
}

export default BackgroundDecorator;
