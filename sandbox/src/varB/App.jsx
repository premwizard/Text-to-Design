import React from 'react';
import GlitchHero from './components/GlitchHero';
import DynamicProductGrid from './components/DynamicProductGrid';
import InteractiveCatalog from './components/InteractiveCatalog';
import NeonBrandStory from './components/NeonBrandStory';
import FuturisticFooter from './components/FuturisticFooter';

export default function App() {
  return (
    <div className="bg-zinc-900 min-h-screen text-gray-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Outfit', sans-serif; }
      `}</style>
      <GlitchHero />
      <DynamicProductGrid />
      <InteractiveCatalog />
      <NeonBrandStory />
      <FuturisticFooter />
    </div>
  );
}