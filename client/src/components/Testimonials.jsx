import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function Testimonials({ testimonials = [] }) {
  const { theme } = useTheme();
  const reviews = Array.isArray(testimonials) ? testimonials : [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`py-16 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'}`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-500">Testimonials</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">What our customers say</h2>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
            Real feedback from real users who love the modern layout and dynamic experience.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(reviews.length ? reviews : [
            { name: 'Mia Carter', role: 'Product Lead', quote: 'The UI renderer helped us ship a polished page in hours, not days.' },
            { name: 'Noah Patel', role: 'Founder', quote: 'The theme system and components feel refreshingly modern and usable.' },
            { name: 'Ava Johnson', role: 'Designer', quote: 'Animations and spacing make every generated screen feel premium.' },
          ]).map((item, index) => (
            <article
              key={index}
              className={`rounded-3xl border p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 text-slate-100'
                  : 'border-slate-200 bg-white text-slate-950'
              }`}
            >
              <p className="text-lg leading-8 text-slate-500 dark:text-slate-300">“{item.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold">{item.name}</p>
                {item.role && <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Testimonials;
