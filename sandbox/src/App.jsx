import React from 'react';
import FloatingNavbar from './components/FloatingNavbar';
import SplitHero from './components/SplitHero';
import ExampleGallery from './components/ExampleGallery';
import FeatureShowcase from './components/FeatureShowcase';
import PricingTiers from './components/PricingTiers';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-zinc-900 min-h-screen text-gray-200 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <FloatingNavbar />
      <SplitHero />
      <ExampleGallery />
      <FeatureShowcase />
      <PricingTiers />
      <FAQSection />
      <Footer />
    </div>
  );
}