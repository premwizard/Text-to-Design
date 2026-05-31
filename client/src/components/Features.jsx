import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';

const defaultItems = [
  { title: 'Flexible layouts', description: 'Build landing pages, dashboards, and content experiences with the same system.' },
  { title: 'Responsive design', description: 'Every section adapts beautifully to desktop, tablet, and mobile screens.' },
  { title: 'Theme-ready', description: 'Light and dark mode support is built into every component.' }
];

export function FeaturesGrid({ items = [], sectionTitle = 'Product Features', sectionSubtitle = 'Everything in One Single Interface' }) {
  const features = Array.isArray(items) ? items : [];
  const activeItems = features.length ? features : defaultItems;

  return (
    <div className="mx-auto max-w-6xl px-4 text-[var(--text)]">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{sectionSubtitle}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeItems.map((item, index) => (
          <article
            key={index}
            className="p-8 shadow-lg transition-all duration-300 bg-[var(--surface)] border border-[var(--secondary)]/20 rounded-[var(--radius)] hover:-translate-y-1 hover:border-[var(--primary)]/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm">
              <span className="text-lg font-bold">✓</span>
            </div>
            <h3 className="mt-6 text-xl font-bold tracking-tight">{item.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text)]/80">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function FeaturesList({ items = [], sectionTitle = 'FEATURES LIST', sectionSubtitle = 'Streamlined & Powerful' }) {
  const features = Array.isArray(items) ? items : [];
  const activeItems = features.length ? features : defaultItems;

  return (
    <div className="mx-auto max-w-4xl px-4 text-[var(--text)]">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{sectionSubtitle}</h2>
      </div>

      <div className="space-y-4">
        {activeItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-start gap-4 p-6 bg-[var(--surface)] border border-[var(--secondary)]/20 rounded-[var(--radius)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)]/10 text-[var(--primary)]">
              <span className="text-base font-bold">✓</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/80">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturesAlternating({ items = [], sectionTitle = 'CAPABILITIES', sectionSubtitle = 'Designed for Visual Impact' }) {
  const features = Array.isArray(items) ? items : [];
  const activeItems = features.length ? features : defaultItems;

  return (
    <div className="mx-auto max-w-5xl px-4 space-y-16 text-[var(--text)]">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{sectionSubtitle}</h2>
      </div>

      <div className="space-y-16">
        {activeItems.map((item, index) => {
          const isEven = index % 2 === 0;
          const fallbackImageUrl = `https://images.unsplash.com/photo-1541462608141-67571a670392?auto=format&fit=crop&w=600&q=80`;
          const imageUrl = item.image?.url || fallbackImageUrl;
          
          return (
            <div key={index} className="grid gap-12 lg:grid-cols-2 items-center">
              <div className={`space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2 text-left'}`}>
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius)] bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
                  <span className="font-bold">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-base leading-relaxed text-[var(--text)]/80">{item.description}</p>
              </div>
              <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="overflow-hidden border border-[var(--secondary)]/20 rounded-[var(--radius)] shadow-xl aspect-video bg-[var(--surface)]">
                  <img src={imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Features(props) {
  const { variant = 'grid' } = props;
  if (variant === 'list') return <FeaturesList {...props} />;
  if (variant === 'alternating' || variant === 'alternating-rows') return <FeaturesAlternating {...props} />;
  return <FeaturesGrid {...props} />;
}
