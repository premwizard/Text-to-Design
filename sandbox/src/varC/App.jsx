import React, { useState } from 'react';
import CleanNavbar from './components/CleanNavbar';
import HeroWithIllustration from './components/HeroWithIllustration';
import TabbedFeatures from './components/TabbedFeatures';
import DataVisualization from './components/DataVisualization';
import TrustBadges from './components/TrustBadges';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700;800&family=Jost:wght@300;400;500;600&display=swap');
        body { font-family: 'Jost', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Cormorant Garamond', sans-serif; }
      `}</style>
      <CleanNavbar />
      <HeroWithIllustration />
      <TabbedFeatures />
      <DataVisualization />
      <TrustBadges />
      <Footer />
    </div>
  );
}