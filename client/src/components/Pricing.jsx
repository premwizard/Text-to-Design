import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function Pricing({ plans = [] }) {
  const { theme } = useTheme();
  const pricingPlans = Array.isArray(plans) && plans.length
    ? plans
    : [
        {
          title: 'Starter',
          price: '$19',
          period: 'month',
          description: 'Perfect for small teams and landing pages.',
          features: ['3 projects', 'Basic analytics', 'Email support'],
          buttonLabel: 'Get started',
        },
        {
          title: 'Growth',
          price: '$49',
          period: 'month',
          description: 'For growing teams that need more power.',
          features: ['Unlimited projects', 'Advanced analytics', 'Priority support'],
          buttonLabel: 'Start free trial',
        },
        {
          title: 'Scale',
          price: '$99',
          period: 'month',
          description: 'Enterprise-grade tools and collaboration.',
          features: ['Team seats', 'Custom reports', 'Dedicated success'],
          buttonLabel: 'Contact sales',
        },
      ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`relative overflow-hidden py-16 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'}`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-500">Pricing</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Plans built for your business</h2>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
            Choose the plan that fits your growth stage and get started with a beautifully designed, flexible dashboard.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl border p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 text-slate-100'
                  : 'border-slate-200 bg-white text-slate-950'
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">{plan.title}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="pb-1 text-sm text-slate-500">/{plan.period}</span>
              </div>
              <p className="mt-4 text-slate-500 dark:text-slate-400">{plan.description}</p>

              <ul className="mt-8 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {(plan.features || []).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <span className="text-sky-500">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.buttonUrl || '#'}
                className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                {plan.buttonLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Pricing;
