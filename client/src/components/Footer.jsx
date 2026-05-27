import { useTheme } from '../context/ThemeContext';

function Footer({ copyright, links = [] }) {
  const { theme } = useTheme();
  const items = Array.isArray(links) ? links : [links];
  const isDark = theme === 'dark';

  return (
    <footer
      className={`rounded-[2rem] px-8 py-8 transition ${
        isDark
          ? 'bg-slate-950 text-slate-100 shadow-slate-950/40'
          : 'bg-white text-slate-950 shadow-slate-200/80'
      }`}
    >
      <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>{copyright || '© 2026 Generated UI'}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {items.filter(Boolean).map((link, index) => {
            if (typeof link === 'object' && link.label) {
              return (
                <a key={index} href={link.url || '#'} className="transition hover:text-sky-500">
                  {link.label}
                </a>
              );
            }

            return (
              <a key={index} href="#" className="transition hover:text-sky-500">
                {link}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
