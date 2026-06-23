import React from 'react';
import TransparentHeader from './components/TransparentHeader';
import VideoHero from './components/VideoHero';
import FullscreenProjectsCarousel from './components/FullscreenProjectsCarousel';
import InteractiveSkillsMap from './components/InteractiveSkillsMap';
import ClientShowcase from './components/ClientShowcase';
import FloatingContactButton from './components/FloatingContactButton';
import SubtleFooter from './components/SubtleFooter';

export default function App() {
  return (
    <div className="bg-stone-950 min-h-screen text-stone-100">
      <style>{
        `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}
      </style>
      <TransparentHeader />
      <VideoHero />
      <FullscreenProjectsCarousel />
      <InteractiveSkillsMap />
      <ClientShowcase />
      <FloatingContactButton />
      <SubtleFooter />
    </div>
  );
}