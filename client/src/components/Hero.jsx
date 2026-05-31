import React from 'react';
import { useDesignSystem as useDesignSystemCtx } from '../context/DesignSystemContext';

export function HeroSplit({ 
  title, 
  subtitle, 
  cta, 
  ctaSecondary, 
  ctaUrl, 
  ctaSecondaryUrl, 
  ctaAction,
  ctaSecondaryAction,
  image, 
  imagePosition = 'right' 
}) {
  const { handleAction } = useDesignSystemCtx();
  const imageUrl = image?.url || 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80';
  const imageAlt = image?.alt || 'AI Interface mockup';

  return (
    <div className="grid gap-12 lg:grid-cols-12 items-center w-full text-[var(--text)]">
      <div className={`lg:col-span-7 flex flex-col items-start text-left ${imagePosition === 'left' ? 'lg:order-2' : ''}`}>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary)]">
          DYNAMIC PREVIEW
        </p>
        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          {title || 'Create custom pages with ease.'}
        </h1>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--text)]/80">
          {subtitle || 'Visual variety and dynamic themes are applied automatically across all elements.'}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {cta && (
            <button
              onClick={() => handleAction(ctaAction || { type: 'navigate', target: ctaUrl || '#' })}
              className="bg-[var(--primary)] text-[var(--background)] px-6 py-3 font-semibold rounded-[var(--radius)] transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              {cta}
            </button>
          )}
          {ctaSecondary && (
            <button
              onClick={() => handleAction(ctaSecondaryAction || { type: 'navigate', target: ctaSecondaryUrl || '#' })}
              className="border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 text-[var(--text)] px-6 py-3 font-semibold rounded-[var(--radius)] transition hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              {ctaSecondary}
            </button>
          )}
        </div>
      </div>
      <div className={`lg:col-span-5 ${imagePosition === 'left' ? 'lg:order-1' : ''}`}>
        <div className="relative overflow-hidden aspect-video lg:aspect-square rounded-[var(--radius)] border border-[var(--secondary)]/20 shadow-2xl bg-[var(--surface)]">
          <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export function HeroCentered({ 
  title, 
  subtitle, 
  cta, 
  ctaSecondary, 
  ctaUrl, 
  ctaSecondaryUrl, 
  ctaAction,
  ctaSecondaryAction 
}) {
  const { handleAction } = useDesignSystemCtx();
  return (
    <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center p-8 relative z-10 text-[var(--text)]">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary)]">
        DYNAMIC ENGINE
      </p>
      <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
        {title || 'Create custom pages with ease.'}
      </h1>
      <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--text)]/85">
        {subtitle || 'Visual variety and dynamic themes are applied automatically across all elements.'}
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
        {cta && (
          <button
            onClick={() => handleAction(ctaAction || { type: 'navigate', target: ctaUrl || '#' })}
            className="bg-[var(--primary)] text-[var(--background)] px-6 py-3 font-semibold rounded-[var(--radius)] transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            {cta}
          </button>
        )}
        {ctaSecondary && (
          <button
            onClick={() => handleAction(ctaSecondaryAction || { type: 'navigate', target: ctaSecondaryUrl || '#' })}
            className="border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 text-[var(--text)] px-6 py-3 font-semibold rounded-[var(--radius)] transition hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            {ctaSecondary}
          </button>
        )}
      </div>
    </div>
  );
}

export function HeroMinimal({ 
  title, 
  subtitle, 
  cta, 
  ctaUrl, 
  ctaAction 
}) {
  const { handleAction } = useDesignSystemCtx();
  return (
    <div className="w-full max-w-3xl mx-auto text-left py-12 text-[var(--text)]">
      <h1 className="text-3xl sm:text-5xl font-light tracking-tight leading-tight">
        {title || 'Create custom pages with ease.'}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--text)]/70">
        {subtitle || 'Visual variety and dynamic themes are applied automatically across all elements.'}
      </p>
      {cta && (
        <div className="mt-6">
          <button
            onClick={() => handleAction(ctaAction || { type: 'navigate', target: ctaUrl || '#' })}
            className="text-xs uppercase tracking-widest font-bold border-b border-[var(--primary)] pb-1 hover:text-[var(--primary)] transition-colors duration-200"
          >
            {cta} &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export function HeroFullscreen({ 
  title, 
  subtitle, 
  cta, 
  ctaSecondary, 
  ctaUrl, 
  ctaSecondaryUrl, 
  ctaAction,
  ctaSecondaryAction,
  image 
}) {
  const { handleAction } = useDesignSystemCtx();
  const imageUrl = image?.url || 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80';
  
  return (
    <div className="relative w-full rounded-[var(--radius)] min-h-[70vh] flex items-center justify-center p-8 sm:p-16 overflow-hidden border border-[var(--secondary)]/20 text-[var(--text)]">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out hover:scale-105" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-[var(--background)]/85 backdrop-blur-[2px]" />
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary)]">
          EXCLUSIVE OFFER
        </p>
        <h1 className="mt-6 text-4xl sm:text-6xl font-black tracking-tight leading-none">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--text)]/80">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          {cta && (
            <button
              onClick={() => handleAction(ctaAction || { type: 'navigate', target: ctaUrl || '#' })}
              className="bg-[var(--primary)] text-[var(--background)] px-6 py-3 font-semibold rounded-[var(--radius)] transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              {cta}
            </button>
          )}
          {ctaSecondary && (
            <button
              onClick={() => handleAction(ctaSecondaryAction || { type: 'navigate', target: ctaSecondaryUrl || '#' })}
              className="border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 text-[var(--text)] px-6 py-3 font-semibold rounded-[var(--radius)] transition hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              {ctaSecondary}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Hero(props) {
  const { variant = 'centered' } = props;
  if (variant === 'split-image' || variant === 'split') return <HeroSplit {...props} />;
  if (variant === 'minimal') return <HeroMinimal {...props} />;
  if (variant === 'fullscreen' || variant === 'gradient') return <HeroFullscreen {...props} />;
  return <HeroCentered {...props} />;
}
