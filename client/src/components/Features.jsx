import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function Features({ items = [] }) {
  const { theme } = useTheme();
  const features = Array.isArray(items) ? items : [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`py-16 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'}`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-500">Features</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Everything you need in one modern interface</h2>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
            A clean, structured section that highlights the value of your product in easy-to-scan cards.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(features.length ? features : [
            { title: 'Flexible layouts', description: 'Build landing pages, dashboards, and content experiences with the same system.' },
            { title: 'Responsive design', description: 'Every section adapts beautifully to desktop, tablet, and mobile screens.' },
            { title: 'Theme-ready', description: 'Light and dark mode support is built into every component.' },
          ]).map((item, index) => (
            <article
              key={index}
              className={`rounded-3xl border p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 text-slate-100'
                  : 'border-slate-200 bg-white text-slate-950'
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg">
                <span className="text-lg font-bold">✓</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
              <p className="mt-4 text-slate-500 dark:text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Features;
