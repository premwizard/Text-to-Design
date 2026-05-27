import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function Form({ title, description, fields = [], button }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const normalizedFields = Array.isArray(fields) ? fields : [];
  const MotionSection = motion.section;

  return (
    <MotionSection
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`rounded-[2rem] p-8 shadow-2xl transition ${
        isDark
          ? 'bg-slate-900 border border-slate-800 text-slate-100 shadow-slate-950/30'
          : 'bg-white border border-slate-200 text-slate-950 shadow-slate-200/60'
      }`}
    >
      <div className="max-w-3xl">
        {title && <h2 className="text-3xl font-bold">{title}</h2>}
        {description && <p className="mt-3 text-slate-500 dark:text-slate-400">{description}</p>}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {normalizedFields.map((field, index) => {
          const label = typeof field === 'object' ? field.label || field.name || 'Field' : String(field);
          const placeholder = typeof field === 'object' ? field.placeholder || field.label || field.name || '' : String(field);
          const type = typeof field === 'object' && field.type ? field.type : 'text';

          return (
            <label key={index} className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>{label}</span>
              <input
                type={type}
                placeholder={placeholder}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
          );
        })}
      </div>

      {button && (
        <button className="mt-8 inline-flex items-center justify-center rounded-lg bg-sky-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
          {button}
        </button>
      )}
    </MotionSection>
  );
}

export default Form;
