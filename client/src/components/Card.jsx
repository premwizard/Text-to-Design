import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function Card({ title, description, button, buttonUrl, icon }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`rounded-3xl border p-7 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
        isDark ? 'border-slate-800 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-950'
      }`}
    >
      {icon && <div className="mb-4 text-3xl">{icon}</div>}
      <h3 className="text-2xl font-bold">{title || 'Card Title'}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-300">{description || 'A brief description for this card component.'}</p>
      {button && (
        <a
          href={buttonUrl || '#'}
          className="mt-8 inline-flex rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          {button}
        </a>
      )}
    </motion.div>
  );
}

export default Card;
