import React from 'react';
import CenteredHero from './components/CenteredHero';
import AccordionFeatures from './components/AccordionFeatures';
import TestimonialCarousel from './components/TestimonialCarousel';
import InteractiveStats from './components/InteractiveStats';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Inter', sans-serif; }
      `}</style>
      <CenteredHero />
      <AccordionFeatures />
      <TestimonialCarousel />
      <InteractiveStats />
      <Footer />
    </div>
  );
}