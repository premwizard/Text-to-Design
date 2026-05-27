import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function Hero({ title, subtitle, cta, ctaSecondary, ctaUrl, ctaSecondaryUrl }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`mx-auto max-w-6xl rounded-[2rem] px-8 py-16 shadow-2xl transition ${
        isDark
          ? 'bg-slate-950 text-slate-100 shadow-slate-950/40'
          : 'bg-white text-slate-950 shadow-slate-200'
      }`}
      style={{ minHeight: '360px' }}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-500">Dynamic UI Preview</p>
      <h1 className="mt-6 text-4xl font-bold sm:text-5xl">{title || 'Your generated hero title'}</h1>
      <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
        {subtitle || 'The subtitle is powered by your prompt and the backend JSON response.'}
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {cta && (
          <a
            href={ctaUrl || '#'}
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-sky-500"
          >
            {cta}
          </a>
        )}
        {ctaSecondary && (
          <a
            href={ctaSecondaryUrl || '#'}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/10 px-8 py-3 text-base font-semibold transition hover:bg-slate-100 hover:text-slate-950"
          >
            {ctaSecondary}
          </a>
        )}
      </div>
    </motion.section>
  );
}

export default Hero;
