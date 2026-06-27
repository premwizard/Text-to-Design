import React from 'react';
import DynamicHero from './components/DynamicHero';
import SplitProjectView from './components/SplitProjectView';
import ImpactStats from './components/ImpactStats';
import AboutMyProcess from './components/AboutMyProcess';
import GradientFooter from './components/GradientFooter';

export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-Outfit">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
          body { font-family: 'Outfit', sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Outfit', sans-serif; }
        `}
      </style>
      <DynamicHero />
      <SplitProjectView />
      <ImpactStats />
      <AboutMyProcess />
      <GradientFooter />
    </div>
  );
}