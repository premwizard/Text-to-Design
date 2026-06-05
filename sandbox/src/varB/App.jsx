import React from 'react';
import GradientNavbar from './components/GradientNavbar';
import SplitScreenHeroWithAnimation from './components/SplitScreenHeroWithAnimation';
import FeatureShowcase from './components/FeatureShowcase';
import AnimatedStats from './components/AnimatedStats';
import StickyCta from './components/StickyCta';
import FooterWithSocial from './components/FooterWithSocial';

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-gray-100 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <GradientNavbar />
      <main>
        <SplitScreenHeroWithAnimation />
        <FeatureShowcase />
        <AnimatedStats />
        <StickyCta />
      </main>
      <FooterWithSocial />
    </div>
  );
}