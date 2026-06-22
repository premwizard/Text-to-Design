import React from 'react';
import * as React from "react";
import FloatingNavbar from './components/FloatingNavbar';
import GradientHero from './components/GradientHero';
import FeatureTimeline from './components/FeatureTimeline';
import AnimatedStats from './components/AnimatedStats';
import TestimonialCarousel from './components/TestimonialCarousel';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-gray-100">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
          body { font-family: 'Inter', sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
        `}
      </style>
      <FloatingNavbar />
      <GradientHero />
      <FeatureTimeline />
      <AnimatedStats />
      <TestimonialCarousel />
      <Footer />
    </div>
  );
}