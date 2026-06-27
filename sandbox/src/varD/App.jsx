import React from 'react';
import MinimalNavbar from './components/MinimalNavbar';
import FullBleedHero from './components/FullBleedHero';
import TabbedFeatures from './components/TabbedFeatures';
import InteractiveDemo from './components/InteractiveDemo';
import PricingTable from './components/PricingTable';
import SimpleFooter from './components/SimpleFooter';

export default function App() {
  return (
    <div className="bg-neutral-950 min-h-screen text-gray-300">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
          body { font-family: 'DM Sans', sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: 'DM Sans', sans-serif; }
        `}
      </style>
      <MinimalNavbar />
      <FullBleedHero />
      <TabbedFeatures />
      <InteractiveDemo />
      <PricingTable />
      <SimpleFooter />
    </div>
  );
}