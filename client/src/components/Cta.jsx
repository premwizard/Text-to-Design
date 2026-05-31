import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';

export function CtaStandard({ 
  title = 'Ready to upgrade your design system?', 
  subtitle = 'Start building premium interfaces with dynamic JSON payloads generated instantly by AI.', 
  buttonLabel = 'Get Started Now', 
  buttonUrl = '#', 
  buttonAction,
  secondaryButtonLabel, 
  secondaryButtonUrl,
  secondaryButtonAction
}) {
  const { handleAction } = useDesignSystem();

  return (
    <section className="mx-auto max-w-6xl rounded-[var(--radius)] px-8 py-12 md:py-16 text-center shadow-2xl relative overflow-hidden border border-[var(--secondary)]/25 bg-[var(--surface)] text-[var(--text)]">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[var(--primary)] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[var(--secondary)] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base leading-relaxed text-[var(--text)]/80">
            {subtitle}
          </p>
        )}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {buttonLabel && (
            <button
              onClick={() => handleAction(buttonAction || { type: 'navigate', target: buttonUrl })}
              className="w-full sm:w-auto text-center bg-[var(--primary)] text-[var(--background)] px-6 py-3 font-semibold rounded-[var(--radius)] hover:opacity-90 transition"
            >
              {buttonLabel}
            </button>
          )}
          {secondaryButtonLabel && (
            <button
              onClick={() => handleAction(secondaryButtonAction || { type: 'navigate', target: secondaryButtonUrl || '#' })}
              className="w-full sm:w-auto text-center border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 text-[var(--text)] px-6 py-3 font-semibold rounded-[var(--radius)] transition"
            >
              {secondaryButtonLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export function CtaGradient({ 
  title = 'Ready to upgrade your design system?', 
  subtitle = 'Start building premium interfaces with dynamic JSON payloads generated instantly by AI.', 
  buttonLabel = 'Get Started Now', 
  buttonUrl = '#', 
  buttonAction,
  secondaryButtonLabel, 
  secondaryButtonUrl,
  secondaryButtonAction
}) {
  const { handleAction } = useDesignSystem();

  return (
    <section className="mx-auto max-w-6xl text-center py-16 px-8 relative overflow-hidden shadow-2xl rounded-[var(--radius)] text-[var(--background)] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]/80">
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
      
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base md:text-lg text-[var(--background)]/90 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {buttonLabel && (
            <button
              onClick={() => handleAction(buttonAction || { type: 'navigate', target: buttonUrl })}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-[var(--radius)] bg-[var(--background)] text-[var(--text)] font-bold px-8 py-3.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl"
            >
              {buttonLabel}
            </button>
          )}
          {secondaryButtonLabel && (
            <button
              onClick={() => handleAction(secondaryButtonAction || { type: 'navigate', target: secondaryButtonUrl || '#' })}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-[var(--radius)] border border-[var(--background)]/30 bg-[var(--background)]/10 text-[var(--background)] font-semibold px-8 py-3.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              {secondaryButtonLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export function CtaMinimal({ 
  title = 'Ready to upgrade your design system?', 
  subtitle = 'Start building premium interfaces with dynamic JSON payloads generated instantly by AI.', 
  buttonLabel = 'Get Started Now', 
  buttonUrl = '#', 
  buttonAction,
  secondaryButtonLabel, 
  secondaryButtonUrl,
  secondaryButtonAction
}) {
  const { handleAction } = useDesignSystem();

  return (
    <section className="mx-auto max-w-5xl py-12 px-6 text-center border-t border-b border-[var(--secondary)]/20 relative z-10 text-[var(--text)]">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base leading-relaxed text-[var(--text)]/80">
            {subtitle}
          </p>
        )}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {buttonLabel && (
            <button
              onClick={() => handleAction(buttonAction || { type: 'navigate', target: buttonUrl })}
              className="w-full sm:w-auto text-center bg-[var(--primary)] text-[var(--background)] px-6 py-3 font-semibold rounded-[var(--radius)] hover:opacity-90 transition"
            >
              {buttonLabel}
            </button>
          )}
          {secondaryButtonLabel && (
            <button
              onClick={() => handleAction(secondaryButtonAction || { type: 'navigate', target: secondaryButtonUrl || '#' })}
              className="w-full sm:w-auto text-center border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 text-[var(--text)] px-6 py-3 font-semibold rounded-[var(--radius)] transition"
            >
              {secondaryButtonLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Cta(props) {
  const { variant = 'standard' } = props;
  if (variant === 'gradient') return <CtaGradient {...props} />;
  if (variant === 'minimal') return <CtaMinimal {...props} />;
  return <CtaStandard {...props} />;
}
