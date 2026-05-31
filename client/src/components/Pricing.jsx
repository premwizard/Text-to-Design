import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';

const defaultPlans = [
  { title: 'Starter', price: '$19', period: 'month', description: 'Perfect for small teams and landing pages.', features: ['3 projects', 'Basic analytics', 'Email support'], buttonLabel: 'Get started' },
  { title: 'Growth', price: '$49', period: 'month', description: 'For growing teams that need more power.', features: ['Unlimited projects', 'Advanced analytics', 'Priority support'], buttonLabel: 'Start free trial', popular: true },
  { title: 'Scale', price: '$99', period: 'month', description: 'Enterprise-grade tools and collaboration.', features: ['Team seats', 'Custom reports', 'Dedicated success'], buttonLabel: 'Contact sales' }
];

export function PricingCards({ plans = [], sectionTitle = 'PRICING OPTIONS', sectionSubtitle = 'Plans built for your business' }) {
  const { handleAction } = useDesignSystem();
  const pricingPlans = Array.isArray(plans) && plans.length ? plans : defaultPlans;

  return (
    <div className="mx-auto max-w-6xl px-4 text-[var(--text)]">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{sectionSubtitle}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-stretch">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="p-8 shadow-xl flex flex-col justify-between transition-all duration-300 relative border border-[var(--secondary)]/20 bg-[var(--surface)] rounded-[var(--radius)] hover:-translate-y-1 hover:border-[var(--primary)]/30"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary)]">{plan.title}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="pb-1 text-sm text-[var(--text)]/70">/{plan.period}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text)]/80">{plan.description}</p>

              <ul className="mt-8 space-y-3.5 text-sm text-[var(--text)]/80">
                {(plan.features || []).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <span className="text-base text-[var(--primary)]">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleAction(plan.action || { type: 'navigate', target: plan.buttonUrl || '#' })}
              className="mt-8 inline-flex w-full items-center justify-center text-sm font-semibold py-3 rounded-[var(--radius)] border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 text-[var(--text)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              {plan.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingComparison({ plans = [], sectionTitle = 'PRICING OPTIONS', sectionSubtitle = 'Compare plans' }) {
  const { handleAction } = useDesignSystem();
  const pricingPlans = Array.isArray(plans) && plans.length ? plans : defaultPlans;

  return (
    <div className="mx-auto max-w-6xl px-4 text-[var(--text)]">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{sectionSubtitle}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-stretch">
        {pricingPlans.map((plan, index) => {
          const isHighlighted = plan.popular;
          return (
            <div
              key={index}
              className={`p-8 shadow-xl flex flex-col justify-between transition-all duration-300 relative border ${
                isHighlighted
                  ? 'border-[var(--primary)] scale-[1.03] lg:scale-[1.05] z-10 bg-[var(--surface)] ring-2 ring-[var(--primary)]/20'
                  : 'border-[var(--secondary)]/20 bg-[var(--surface)] opacity-95'
              } rounded-[var(--radius)]`}
            >
              {isHighlighted && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-[var(--background)] bg-[var(--primary)]">
                  MOST POPULAR
                </span>
              )}

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary)]">{plan.title}</p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="pb-1 text-sm text-[var(--text)]/70">/{plan.period}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text)]/80">{plan.description}</p>

                <ul className="mt-8 space-y-3.5 text-sm text-[var(--text)]/85">
                  {(plan.features || []).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <span className="text-base text-[var(--primary)]">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleAction(plan.action || { type: 'navigate', target: plan.buttonUrl || '#' })}
                className={`mt-8 inline-flex w-full items-center justify-center text-sm font-semibold py-3 rounded-[var(--radius)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${
                  isHighlighted
                    ? 'bg-[var(--primary)] text-[var(--background)] hover:opacity-90'
                    : 'border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 text-[var(--text)]'
                }`}
              >
                {plan.buttonLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PricingMinimalTable({ plans = [], sectionTitle = 'PRICING TABLES', sectionSubtitle = 'Flexible plans for everyone' }) {
  const { handleAction } = useDesignSystem();
  const pricingPlans = Array.isArray(plans) && plans.length ? plans : defaultPlans;

  return (
    <div className="mx-auto max-w-4xl px-4 text-[var(--text)]">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--primary)]">{sectionTitle}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{sectionSubtitle}</h2>
      </div>

      <div className="space-y-4">
        {pricingPlans.map((plan, index) => (
          <div 
            key={index} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border border-[var(--secondary)]/20 bg-[var(--surface)] rounded-[var(--radius)]"
          >
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">{plan.title}</span>
              <h3 className="text-xl font-bold">{plan.description || 'Description of services.'}</h3>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-6">
              <div className="text-right">
                <span className="text-3xl font-extrabold">{plan.price}</span>
                <span className="text-xs text-[var(--text)]/70">/{plan.period}</span>
              </div>
              <button
                onClick={() => handleAction(plan.action || { type: 'navigate', target: plan.buttonUrl || '#' })}
                className="bg-[var(--primary)] text-[var(--background)] text-sm px-5 py-2 font-semibold rounded-[var(--radius)] transition hover:opacity-90 active:scale-[0.98]"
              >
                {plan.buttonLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Pricing(props) {
  const { variant = 'cards' } = props;
  if (variant === 'minimal-table' || variant === 'table') return <PricingMinimalTable {...props} />;
  if (variant === 'comparison' || variant === 'highlight-popular' || variant === 'highlighted') return <PricingComparison {...props} />;
  return <PricingCards {...props} />;
}
