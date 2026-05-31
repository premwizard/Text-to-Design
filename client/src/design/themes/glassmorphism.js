export default {
  id: 'glassmorphism',
  name: 'Glassmorphism',
  fontFamily: {
    headings: 'Outfit, sans-serif',
    body: 'Inter, sans-serif'
  },
  classes: {
    body: 'bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950 text-slate-100 min-h-screen',
    section: 'bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl',
    card: 'bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 rounded-2xl shadow-lg',
    buttonPrimary: 'bg-gradient-to-r from-sky-400/80 to-blue-500/80 text-white backdrop-blur-md hover:from-sky-400 hover:to-blue-500 border border-white/20 shadow-lg rounded-2xl px-6 py-3 transition',
    buttonSecondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-2xl px-6 py-3 transition',
    border: 'border-white/10',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300/80'
  },
  design: {
    spacing: 'comfortable',
    borderRadius: '2xl',
    shadow: '2xl',
    alternatingBg: false
  }
};
