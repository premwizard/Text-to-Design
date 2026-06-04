import React from 'react';
import ElegantNavbar from './components/ElegantNavbar';
import StatelyHero from './components/StatelyHero';
import FeaturedWorks from './components/FeaturedWorks';
import PersonalStory from './components/PersonalStory';
import InquiryForm from './components/InquiryForm';

export default function App() {
  return (
    <div className="bg-neutral-100 min-h-screen text-neutral-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700;800&family=Jost:wght@300;400;500;600&display=swap');
        body { font-family: 'Jost', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Cormorant Garamond', sans-serif; }
      `}</style>
      <ElegantNavbar />
      <StatelyHero />
      <FeaturedWorks />
      <PersonalStory />
      <InquiryForm />
    </div>
  );
}