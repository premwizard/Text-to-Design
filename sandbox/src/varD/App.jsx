import React from 'react';
import IndustrialNavbar from './components/IndustrialNavbar';
import BoldHero from './components/BoldHero';
import FeatureAccordion from './components/FeatureAccordion';
import InteractiveProcess from './components/InteractiveProcess';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Space+Mono:wght@300;400;500;600&display=swap');
        body { font-family: 'Space Mono', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <IndustrialNavbar />
      <BoldHero />
      <FeatureAccordion />
      <InteractiveProcess />
      <FAQSection />
      <Footer />
    </div>
  );
}