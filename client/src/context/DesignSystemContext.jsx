import React, { createContext, useContext, useMemo, useEffect } from 'react';
import themes from '../design/themes/index';
import { getPalette } from '../design/paletteGenerator';

const DesignSystemContext = createContext({
  theme: themes.modern,
  palette: getPalette('blue-purple'),
  borderRadiusClass: 'rounded-xl',
  spacingClass: {
    padding: 'py-16 px-6 sm:px-8',
    gap: 'gap-8',
    itemGap: 'gap-6'
  },
  mood: 'default',
  handleAction: () => {},
  cssVars: {}
});

const borderRadiusMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full'
};

const spacingMap = {
  compact: {
    padding: 'py-8 px-4 sm:px-6',
    gap: 'gap-4',
    itemGap: 'gap-3'
  },
  comfortable: {
    padding: 'py-14 px-6 sm:px-8',
    gap: 'gap-8',
    itemGap: 'gap-6'
  },
  spacious: {
    padding: 'py-24 px-8 sm:px-12',
    gap: 'gap-16',
    itemGap: 'gap-8'
  }
};

export function DesignSystemProvider({ children, metadata = {}, onAction }) {
  const designSystem = useMemo(() => {
    // Resolve theme, mapping variations to standard keys
    let themeId = String(metadata.theme || 'modern').toLowerCase().trim();
    if (themeId === 'modern saas' || themeId === 'modern-saas') themeId = 'modern';
    if (themeId === 'startup' || themeId === 'vibrant startup') themeId = 'startup';
    if (themeId === 'bold brutalism' || themeId === 'bold-brutalism') themeId = 'bold';
    if (themeId === 'luxury editorial' || themeId === 'luxury-editorial') themeId = 'luxury';

    const activeTheme = themes[themeId] || themes.modern;

    // Resolve palette
    const paletteId = String(metadata.palette || 'blue-purple').toLowerCase().trim();
    const activePalette = getPalette(paletteId);

    // Override colors if explicitly defined in designSystem JSON
    const colors = {
      primary: metadata.colors?.primary || activePalette.primary || '#3b82f6',
      secondary: metadata.colors?.secondary || activePalette.secondary || '#0f172a',
      background: metadata.colors?.background || '#020617',
      surface: metadata.colors?.surface || '#0f172a',
      text: metadata.colors?.text || '#f8fafc'
    };

    // Resolve border radius key
    const borderRadiusKey = metadata.borderRadius || activeTheme.design.borderRadius || 'lg';
    const borderRadiusClass = borderRadiusMap[borderRadiusKey] || 'rounded-xl';

    // Resolve radius px value for CSS variables
    const radiusPxMap = { none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px', '3xl': '32px', full: '9999px' };
    const radiusPx = radiusPxMap[borderRadiusKey] || '12px';

    // Resolve spacing scale
    const spacingKey = metadata.spacing || activeTheme.design.spacing || 'comfortable';
    const spacingClass = spacingMap[spacingKey] || spacingMap.comfortable;

    // Build the dynamic CSS variables block
    const cssVars = {
      '--primary': colors.primary,
      '--secondary': colors.secondary,
      '--background': colors.background,
      '--surface': colors.surface,
      '--text': colors.text,
      '--radius': radiusPx,
      '--font': metadata.typography?.font || activeTheme.fontFamily.body || 'Inter, sans-serif'
    };

    // Default Action handler if none is passed
    const defaultActionHandler = (action) => {
      if (!action) return;
      console.log('Action triggered:', action);
      if (onAction) {
        onAction(action);
        return;
      }
      const { type, target } = action;
      if (type === 'navigate') {
        window.open(target || '#', '_blank');
      } else if (type === 'scroll-to-section') {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (type === 'open-modal') {
        alert(`Opening modal: ${target}`);
      }
    };

    return {
      theme: activeTheme,
      palette: activePalette,
      borderRadiusClass,
      spacingClass,
      mood: metadata.mood || 'default',
      handleAction: defaultActionHandler,
      cssVars
    };
  }, [metadata, onAction]);

  useEffect(() => {
    if (designSystem.cssVars) {
      Object.entries(designSystem.cssVars).forEach(([key, val]) => {
        document.documentElement.style.setProperty(key, val);
      });
      const font = designSystem.cssVars['--font'];
      if (font && font !== 'sans-serif') {
        const cleanFont = font.split(',')[0].replace(/['"]/g, '').trim();
        const formatted = cleanFont.replace(/\s+/g, '+');
        const id = `gfont-${formatted}`;
        if (!document.getElementById(id)) {
          const link = document.createElement('link');
          link.id = id;
          link.rel = 'stylesheet';
          link.href = `https://fonts.googleapis.com/css2?family=${formatted}:wght@300;400;500;600;700;800&display=swap`;
          document.head.appendChild(link);
        }
      }
    }
  }, [designSystem.cssVars]);

  return (
    <DesignSystemContext.Provider value={designSystem}>{children}</DesignSystemContext.Provider>
  );
}

export function useDesignSystem() {
  return useContext(DesignSystemContext);
}
export default DesignSystemContext;
