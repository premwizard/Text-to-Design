import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function Stats({ stats = [] }) {
  const { theme } = useTheme();
  const metrics = Array.isArray(stats) && stats.length
    ? stats
    : [
        { label: 'Users', value: '10K+' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Launches', value: '120+' },
        { label: 'Global clients', value: '32 countries' },
      ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`py-16 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'}`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-500">Stats</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Performance metrics that matter</h2>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
            Showcase the numbers that prove your product’s impact across growth, reliability, and trust.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`rounded-3xl border p-8 text-center shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 text-slate-100'
                  : 'border-slate-200 bg-white text-slate-950'
              }`}
            >
              <p className="text-4xl font-bold tracking-tight">{metric.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Stats;
