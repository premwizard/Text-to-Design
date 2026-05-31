import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';

const defaultReviews = [
  { name: 'Mia Carter', role: 'Product Lead', quote: 'The UI renderer helped us ship a polished page in hours, not days.' },
  { name: 'Noah Patel', role: 'Founder', quote: 'The theme system and components feel refreshingly modern and usable.' },
  { name: 'Ava Johnson', role: 'Designer', quote: 'Animations and spacing make every generated screen feel premium.' }
];

export function TestimonialsGrid({ testimonials = [], sectionTitle = 'TESTIMONIALS', sectionSubtitle = 'What our customers say' }) {
  const reviews = Array.isArray(testimonials) && testimonials.length ? testimonials : defaultReviews;

  return (
    <div className="mx-auto max-w-6xl px-4 text-[var(--text)]">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{sectionSubtitle}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((item, index) => (
          <article
            key={index}
            className="p-8 hover:-translate-y-1 shadow-lg transition-all duration-300 border border-[var(--secondary)]/20 bg-[var(--surface)] rounded-[var(--radius)] flex flex-col justify-between"
          >
            <p className="text-base leading-relaxed text-[var(--text)]/80 italic text-left">“{item.quote}”</p>
            <div className="mt-8 border-t border-[var(--secondary)]/10 pt-4 text-left">
              <p className="font-bold text-sm">{item.name}</p>
              {item.role && <p className="text-xs uppercase tracking-wider text-[var(--primary)] mt-0.5">{item.role}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsCarousel({ testimonials = [], sectionTitle = 'TESTIMONIALS', sectionSubtitle = 'User Success Stories' }) {
  const reviews = Array.isArray(testimonials) && testimonials.length ? testimonials : defaultReviews;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = reviews[activeIndex] || reviews[0];

  return (
    <div className="mx-auto max-w-3xl px-4 text-center text-[var(--text)]">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
      <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight mb-12">{sectionSubtitle}</h2>

      <div className="p-8 border border-[var(--secondary)]/20 bg-[var(--surface)] rounded-[var(--radius)] relative min-h-[220px] flex flex-col justify-between">
        <div className="space-y-6 transition-all duration-300">
          <p className="text-lg md:text-xl italic leading-relaxed text-[var(--text)]/90">
            “{active.quote}”
          </p>
          <div>
            <p className="font-bold text-base">{active.name}</p>
            {active.role && <p className="text-xs uppercase tracking-wider text-[var(--primary)] mt-1">{active.role}</p>}
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-6 bg-[var(--primary)]' : 'w-2 bg-[var(--text)]/30'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsStacked({ testimonials = [], sectionTitle = 'REVIEWS', sectionSubtitle = 'What our clients say' }) {
  const reviews = Array.isArray(testimonials) && testimonials.length ? testimonials : defaultReviews;

  return (
    <div className="mx-auto max-w-4xl px-4 text-[var(--text)]">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{sectionSubtitle}</h2>
      </div>

      <div className="space-y-4">
        {reviews.map((item, index) => (
          <div 
            key={index} 
            className="p-6 border border-[var(--secondary)]/20 bg-[var(--surface)] rounded-[var(--radius)] flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex-1 text-left">
              <p className="text-base italic leading-relaxed text-[var(--text)]/95">“{item.quote}”</p>
            </div>
            <div className="shrink-0 text-left md:text-right">
              <p className="font-bold text-sm">{item.name}</p>
              {item.role && <p className="text-xs text-[var(--primary)] mt-0.5">{item.role}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials(props) {
  const { variant = 'grid' } = props;
  if (variant === 'carousel') return <TestimonialsCarousel {...props} />;
  if (variant === 'stacked' || variant === 'rows') return <TestimonialsStacked {...props} />;
  return <TestimonialsGrid {...props} />;
}
