export default {
  id: 'minimal',
  name: 'Minimalist',
  fontFamily: {
    headings: 'Inter, sans-serif',
    body: 'Inter, sans-serif'
  },
  classes: {
    body: 'bg-white text-neutral-900 font-light',
    section: 'bg-neutral-50 border-b border-neutral-100',
    card: 'bg-white border border-neutral-200 hover:border-neutral-950 transition-colors duration-250',
    buttonPrimary: 'bg-neutral-950 hover:bg-neutral-800 text-white font-medium px-6 py-3 transition rounded-none',
    buttonSecondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-6 py-3 transition border border-neutral-200 rounded-none',
    border: 'border-neutral-200',
    textPrimary: 'text-neutral-900',
    textSecondary: 'text-neutral-500'
  },
  design: {
    spacing: 'compact',
    borderRadius: 'none',
    shadow: 'none',
    alternatingBg: false
  }
};
