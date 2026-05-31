export default {
  id: 'luxury',
  name: 'Luxury Editorial',
  fontFamily: {
    headings: 'Playfair Display, serif',
    body: 'Inter, sans-serif'
  },
  classes: {
    body: 'bg-stone-950 text-stone-100 font-sans',
    section: 'bg-stone-900/40 border border-stone-800/80 rounded-[1.5rem] relative overflow-hidden',
    card: 'bg-stone-900 border border-stone-850 hover:border-amber-700/60 hover:shadow-2xl transition-all duration-300 rounded-xl',
    buttonPrimary: 'bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold tracking-wide rounded-lg px-6 py-3 transition shadow-[0_0_15px_rgba(217,119,6,0.2)]',
    buttonSecondary: 'bg-stone-900 hover:bg-stone-850 text-amber-500 border border-amber-800/40 rounded-lg px-6 py-3 transition',
    border: 'border-stone-800/80',
    textPrimary: 'text-stone-100',
    textSecondary: 'text-stone-400'
  },
  design: {
    spacing: 'comfortable',
    borderRadius: 'md',
    shadow: 'md',
    alternatingBg: true
  }
};
