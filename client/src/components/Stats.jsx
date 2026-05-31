import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';

const defaultMetrics = [
  { label: 'Users', value: '10K+' },
  { label: 'Uptime', value: '99.99%' },
  { label: 'Launches', value: '120+' },
  { label: 'Global clients', value: '32 countries' },
];

export function StatsGrid({ stats = [], sectionTitle = 'Stats', sectionSubtitle = 'Performance metrics that matter' }) {
  const metrics = Array.isArray(stats) && stats.length ? stats : defaultMetrics;

  return (
    <div className="mx-auto max-w-6xl px-4 text-[var(--text)]">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">{sectionSubtitle}</h2>
        <p className="mt-4 text-base text-[var(--text)]/80">
          Showcase the numbers that prove your product’s impact across growth, reliability, and trust.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="rounded-[var(--radius)] border border-[var(--secondary)]/20 p-8 text-center shadow-xl transition hover:-translate-y-1 hover:shadow-2xl bg-[var(--surface)]"
          >
            <p className="text-4xl font-bold tracking-tight text-[var(--primary)]">{metric.value}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-[var(--text)]/75">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsSimple({ stats = [], sectionTitle = 'Stats' }) {
  const metrics = Array.isArray(stats) && stats.length ? stats : defaultMetrics;

  return (
    <div className="mx-auto max-w-6xl px-4 text-[var(--text)] text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--primary)] mb-8">{sectionTitle}</p>
      <div className="flex flex-wrap justify-center gap-12 sm:gap-20">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <p className="text-5xl font-extrabold tracking-tight text-[var(--text)]">{metric.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--text)]/65">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stats(props) {
  const { variant = 'grid' } = props;
  if (variant === 'simple') return <StatsSimple {...props} />;
  return <StatsGrid {...props} />;
}
