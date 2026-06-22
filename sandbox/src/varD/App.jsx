import React from 'react';
import SplitHero from './components/SplitHero';
import FeatureAccordion from './components/FeatureAccordion';
import TestimonialSection from './components/TestimonialSection';
import InteractiveStats from './components/InteractiveStats';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-stone-900 min-h-screen text-zinc-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <SplitHero/>
      <FeatureAccordion/>
      <TestimonialSection/>
      <InteractiveStats/>
      <Footer/>
    </div>
  );
}