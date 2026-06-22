import React from 'react';
import CenteredHero from './components/CenteredHero';
import BentoFeatures from './components/BentoFeatures';
import AccordionFAQ from './components/AccordionFAQ';
import InteractiveDemo from './components/InteractiveDemo';
import SimpleFooter from './components/SimpleFooter';

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
          body { font-family: 'DM Sans', sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: 'DM Sans', sans-serif; }
        `}
      </style>
      <CenteredHero />
      <BentoFeatures />
      <InteractiveDemo />
      <AccordionFAQ />
      <SimpleFooter />
    </div>
  );
}