import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';

export function FooterSimple({ copyright, links = [] }) {
  const { handleAction } = useDesignSystem();
  const items = Array.isArray(links) ? links : [links];

  return (
    <footer className="border border-[var(--secondary)]/20 p-8 rounded-[var(--radius)] bg-[var(--surface)] text-[var(--text)]">
      <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[var(--text)]/70">{copyright || '© 2026 Generated UI'}</p>
        <div className="flex flex-wrap items-center gap-6 text-sm">
          {items.filter(Boolean).map((link, index) => {
            const label = typeof link === 'object' && link.label ? link.label : String(link);
            const linkAction = typeof link === 'object' ? link.action || { type: 'navigate', target: link.url } : { type: 'navigate', target: '#' };
            return (
              <button 
                key={index} 
                onClick={() => handleAction(linkAction)}
                className="transition-colors duration-250 text-[var(--text)]/70 hover:text-[var(--primary)]"
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export function FooterCenteredLogo({ copyright, links = [] }) {
  const { handleAction } = useDesignSystem();
  const items = Array.isArray(links) ? links : [links];

  return (
    <footer className="border border-[var(--secondary)]/20 p-8 rounded-[var(--radius)] bg-[var(--surface)] text-[var(--text)]">
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <span className="text-2xl font-bold tracking-tight text-[var(--primary)]">UI Studio</span>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          {items.filter(Boolean).map((link, index) => {
            const label = typeof link === 'object' && link.label ? link.label : String(link);
            const linkAction = typeof link === 'object' ? link.action || { type: 'navigate', target: link.url } : { type: 'navigate', target: '#' };
            return (
              <button 
                key={index} 
                onClick={() => handleAction(linkAction)}
                className="transition-colors duration-200 text-[var(--text)]/70 hover:text-[var(--primary)]"
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-[var(--text)]/60 border-t border-[var(--secondary)]/10 pt-4 w-full">
          {copyright || '© 2026 Generated UI. All rights reserved.'}
        </div>
      </div>
    </footer>
  );
}

export function FooterGridColumns({ copyright, links = [] }) {
  const { handleAction } = useDesignSystem();
  const items = Array.isArray(links) ? links : [links];

  return (
    <footer className="border border-[var(--secondary)]/20 p-8 rounded-[var(--radius)] bg-[var(--surface)] text-[var(--text)]">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left">
        <div className="space-y-4">
          <span className="text-xl font-bold tracking-tight text-[var(--primary)]">UI Studio</span>
          <p className="text-xs leading-relaxed text-[var(--text)]/70">
            Building gorgeous websites from text descriptions on-demand.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Product</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => handleAction({ type: 'navigate', target: '#' })} className="hover:text-[var(--primary)] text-[var(--text)]/70">
                Features
              </button>
            </li>
            <li>
              <button onClick={() => handleAction({ type: 'navigate', target: '#' })} className="hover:text-[var(--primary)] text-[var(--text)]/70">
                Pricing
              </button>
            </li>
            <li>
              <button onClick={() => handleAction({ type: 'navigate', target: '#' })} className="hover:text-[var(--primary)] text-[var(--text)]/70">
                Integrations
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Resources</h4>
          <ul className="space-y-2 text-xs">
            {items.filter(Boolean).map((link, index) => {
              const label = typeof link === 'object' && link.label ? link.label : String(link);
              const linkAction = typeof link === 'object' ? link.action || { type: 'navigate', target: link.url } : { type: 'navigate', target: '#' };
              return (
                <li key={index}>
                  <button onClick={() => handleAction(linkAction)} className="hover:text-[var(--primary)] text-[var(--text)]/70">
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider">Join Newsletter</h4>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="you@domain.com"
              className="rounded-[var(--radius)] text-xs px-3 py-2 border border-[var(--secondary)]/30 w-full outline-none bg-[var(--background)] text-[var(--text)] focus:border-[var(--primary)]"
            />
            <button 
              onClick={() => handleAction({ type: 'open-modal', target: 'newsletter' })}
              className="bg-[var(--primary)] text-[var(--background)] text-[10px] uppercase font-black px-4 py-2 rounded-[var(--radius)]"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="text-xs text-[var(--text)]/60 border-t border-[var(--secondary)]/10 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p>{copyright || '© 2026 Generated UI. All rights reserved.'}</p>
        <p className="flex gap-4">
          <button onClick={() => handleAction({ type: 'navigate', target: '#privacy' })} className="hover:underline">Privacy Policy</button>
          <button onClick={() => handleAction({ type: 'navigate', target: '#terms' })} className="hover:underline">Terms of Use</button>
        </p>
      </div>
    </footer>
  );
}

export default function Footer(props) {
  const { variant = 'simple' } = props;
  if (variant === 'centered-logo' || variant === 'centered') return <FooterCenteredLogo {...props} />;
  if (variant === 'grid-columns' || variant === 'grid' || variant === 'detailed') return <FooterGridColumns {...props} />;
  return <FooterSimple {...props} />;
}
