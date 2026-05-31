import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';

function Card({ title, description, button, buttonUrl, action, icon, variant = 'standard' }) {
  const { handleAction } = useDesignSystem();

  let cardClasses = 'transition duration-300 hover:-translate-y-1';
  let buttonClasses = 'inline-flex items-center justify-center font-semibold transition hover:opacity-90 active:scale-[0.98]';

  if (variant === 'glass') {
    cardClasses += ' rounded-[var(--radius)] border border-white/20 bg-white/10 backdrop-blur-md text-[var(--text)] p-7 shadow-lg hover:shadow-xl';
    buttonClasses += ' mt-8 bg-[var(--primary)] text-[var(--background)] px-5 py-3 text-sm rounded-[var(--radius)]';
  } else if (variant === 'minimal') {
    cardClasses += ' border-none bg-transparent shadow-none text-[var(--text)] p-4';
    buttonClasses += ' mt-6 text-xs uppercase tracking-widest font-bold border-b border-[var(--primary)] pb-1 text-[var(--primary)]';
  } else if (variant === 'stats') {
    cardClasses += ' rounded-[var(--radius)] border border-[var(--secondary)]/20 bg-[var(--surface)] text-[var(--text)] p-8 shadow-md text-center flex flex-col justify-center items-center';
    buttonClasses += ' mt-6 bg-[var(--primary)] text-[var(--background)] px-4 py-2 text-xs rounded-[var(--radius)]';
  } else {
    // standard
    cardClasses += ' rounded-[var(--radius)] border border-[var(--secondary)]/20 bg-[var(--surface)] text-[var(--text)] p-7 shadow-xl hover:shadow-2xl';
    buttonClasses += ' mt-8 bg-[var(--primary)] text-[var(--background)] px-5 py-3 text-sm rounded-[var(--radius)]';
  }

  return (
    <div className={cardClasses}>
      {icon && <div className="mb-4 text-3xl">{icon}</div>}
      <h3 className="text-2xl font-bold">{title || 'Card Title'}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--text)]/80">{description || 'A brief description for this card component.'}</p>
      {button && (
        <button
          onClick={() => handleAction(action || { type: 'navigate', target: buttonUrl || '#' })}
          className={buttonClasses}
        >
          {button}
        </button>
      )}
    </div>
  );
}

export default Card;
