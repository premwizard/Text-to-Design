import React from 'react';
import MonochromeHeader from './components/MonochromeHeader';
import StatementHero from './components/StatementHero';
import ProjectTimeline from './components/ProjectTimeline';
import ManifestoText from './components/ManifestoText';
import GlitchyContactModule from './components/GlitchyContactModule';
import BrutalistFooter from './components/BrutalistFooter';

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-gray-50">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Space+Mono:wght@300;400;500;600&display=swap');
          body { font-family: 'Space Mono', sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
        `}
      </style>
      <MonochromeHeader />
      <StatementHero />
      <ProjectTimeline />
      <ManifestoText />
      <GlitchyContactModule />
      <BrutalistFooter />
    </div>
  );
}