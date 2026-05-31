export const palettes = {
  'blue-purple': {
    id: 'blue-purple',
    name: 'Blue Purple',
    primary: '#6366f1',
    secondary: '#4f46e5',
    textAccent: 'text-indigo-500 dark:text-indigo-400',
    bgGradient: 'from-blue-600 to-indigo-600',
    borderHighlight: 'border-indigo-500/50',
    badgeBg: 'bg-indigo-500/10 text-indigo-400'
  },
  'orange-red': {
    id: 'orange-red',
    name: 'Orange Red',
    primary: '#f97316',
    secondary: '#dc2626',
    textAccent: 'text-orange-500 dark:text-orange-400',
    bgGradient: 'from-orange-500 to-red-600',
    borderHighlight: 'border-orange-500/50',
    badgeBg: 'bg-orange-500/10 text-orange-400'
  },
  'emerald-cyan': {
    id: 'emerald-cyan',
    name: 'Emerald Cyan',
    primary: '#10b981',
    secondary: '#06b6d4',
    textAccent: 'text-emerald-500 dark:text-emerald-400',
    bgGradient: 'from-emerald-500 to-cyan-500',
    borderHighlight: 'border-emerald-500/50',
    badgeBg: 'bg-emerald-500/10 text-emerald-400'
  },
  'black-gold': {
    id: 'black-gold',
    name: 'Black Gold',
    primary: '#d97706',
    secondary: '#1c1917',
    textAccent: 'text-amber-500 dark:text-amber-400',
    bgGradient: 'from-amber-650 via-amber-600 to-yellow-500',
    borderHighlight: 'border-amber-600/50',
    badgeBg: 'bg-amber-500/10 text-amber-500'
  },
  'pastel': {
    id: 'pastel',
    name: 'Soft Pastel',
    primary: '#f472b6',
    secondary: '#38bdf8',
    textAccent: 'text-pink-500 dark:text-pink-400',
    bgGradient: 'from-pink-300 to-sky-300',
    borderHighlight: 'border-pink-300/50',
    badgeBg: 'bg-pink-400/10 text-pink-400'
  },
  'monochrome': {
    id: 'monochrome',
    name: 'Monochrome',
    primary: '#171717',
    secondary: '#fafafa',
    textAccent: 'text-neutral-900 dark:text-neutral-100',
    bgGradient: 'from-neutral-800 to-neutral-950',
    borderHighlight: 'border-neutral-800 dark:border-neutral-200',
    badgeBg: 'bg-neutral-500/10 text-neutral-800 dark:text-neutral-200'
  }
};

export function getPalette(name) {
  if (!name) return palettes['blue-purple'];
  const clean = String(name).toLowerCase().trim();
  return palettes[clean] || palettes['blue-purple'];
}
