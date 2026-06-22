import React from 'react';
import HeroCarousel from './components/HeroCarousel';
import FeatureTimeline from './components/FeatureTimeline';
import TestimonialCarousel from './components/TestimonialCarousel';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-orange-50 min-h-screen text-zinc-700">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Lora', sans-serif; }
      `}</style>
      <HeroCarousel />
      <FeatureTimeline />
      <TestimonialCarousel />
      <CallToAction />
      <Footer />
    </div>
  );
}