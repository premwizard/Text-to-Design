import React from 'react';
import FloatingHeader from './components/FloatingHeader';
import IntroSplash from './components/IntroSplash';
import FeaturedProjectsGrid from './components/FeaturedProjectsGrid';
import AboutSummary from './components/AboutSummary';
import SkillPillars from './components/SkillPillars';
import ContactFormBlock from './components/ContactFormBlock';
import FooterLinks from './components/FooterLinks';

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', sans-serif; }
      `}</style>
      <FloatingHeader />
      <main>
        <IntroSplash />
        <FeaturedProjectsGrid />
        <AboutSummary />
        <SkillPillars />
        <ContactFormBlock />
      </main>
      <FooterLinks />
    </div>
  );
}