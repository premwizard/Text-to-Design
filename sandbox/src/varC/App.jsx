import React from 'react';
import BlockyNavbar from './components/BlockyNavbar';
import ImpactHero from './components/ImpactHero';
import WorkCollage from './components/WorkCollage';
import ProcessExplanation from './components/ProcessExplanation';
import ContactButton from './components/ContactButton';

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white font-mono">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Space+Mono:wght@300;400;500;600&display=swap');
        body { font-family: 'Space Mono', monospace; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <BlockyNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-12 md:py-20">
        <ImpactHero />
        <WorkCollage />
        <ProcessExplanation />
        <ContactButton />
      </main>
    </div>
  );
}