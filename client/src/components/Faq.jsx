import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';

const defaultFaqItems = [
  { question: 'What is this platform?', answer: 'This is an AI-powered Text-to-Design production rendering platform.' },
  { question: 'How do I generate components?', answer: 'Enter a detailed prompt in the workspace to construct elements dynamically.' },
  { question: 'Are the designs responsive?', answer: 'Yes! All elements support layouts optimized for mobile, tablet, and desktop views.' }
];

export function FaqAccordion({ items = [], sectionTitle = 'FAQ', sectionSubtitle = 'Frequently Asked Questions' }) {
  const faqItems = Array.isArray(items) && items.length > 0 ? items : defaultFaqItems;
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 text-[var(--text)]">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{sectionSubtitle}</h2>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index} 
              className="border border-[var(--secondary)]/20 bg-[var(--surface)] rounded-[var(--radius)] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-base transition-colors duration-250 hover:text-[var(--primary)]"
              >
                <span className="pr-4">{item.question}</span>
                <span className={`text-sm transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--primary)]' : 'text-[var(--text)]/50'}`}>
                  ▼
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="px-6 pb-5 pt-1 text-sm leading-relaxed border-t border-[var(--secondary)]/10 text-left text-[var(--text)]/80">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FaqList({ items = [], sectionTitle = 'FAQ', sectionSubtitle = 'Frequently Asked Questions' }) {
  const faqItems = Array.isArray(items) && items.length > 0 ? items : defaultFaqItems;

  return (
    <div className="mx-auto max-w-5xl px-4 text-[var(--text)]">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{sectionSubtitle}</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 text-left">
        {faqItems.map((item, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-lg font-bold flex items-start gap-2">
              <span className="text-xl text-[var(--primary)]">Q.</span>
              <span>{item.question}</span>
            </h3>
            <p className="text-sm leading-relaxed pl-6 text-[var(--text)]/80">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Faq(props) {
  const { variant = 'accordion' } = props;
  if (variant === 'list') return <FaqList {...props} />;
  return <FaqAccordion {...props} />;
}
