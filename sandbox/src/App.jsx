import React from 'react';
import SimpleNavbar from './components/SimpleNavbar';
import HeroDropdown from './components/HeroDropdown';
import FeatureCards from './components/FeatureCards';
import InteractiveDemo from './components/InteractiveDemo';
import MinimalFooter from './components/MinimalFooter';

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'DM Sans', sans-serif; }
      `}</style>
      <SimpleNavbar />
      <main className="space-y-24 md:space-y-32 py-12">
        <HeroDropdown />
        <FeatureCards />
        <InteractiveDemo />
      </main>
      <MinimalFooter />
    </div>
  );
}