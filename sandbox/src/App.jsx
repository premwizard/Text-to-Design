import React from 'react';
import FloatingNavbar from './components/FloatingNavbar';
import SplitHero from './components/SplitHero';
import FeatureGrid from './components/FeatureGrid';
import InteractivePromptGenerator from './components/InteractivePromptGenerator';
import UserGallery from './components/UserGallery';
import PricingTiers from './components/PricingTiers';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-gray-200 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <FloatingNavbar />
      <main>
        <SplitHero />
        <FeatureGrid />
        <InteractivePromptGenerator />
        <UserGallery />
        <PricingTiers />
      </main>
      <Footer />
    </div>
  );
}