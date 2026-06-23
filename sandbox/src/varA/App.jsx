import React from 'react';
import FullBleedHero from './components/FullBleedHero';
import ProjectGrid from './components/ProjectGrid';
import SkillsSection from './components/SkillsSection';
import AboutMe from './components/AboutMe';
import ContactForm from './components/ContactForm';

export default function App() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
          body { font-family: 'DM Sans', sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', sans-serif; }
        `}
      </style>
      <FullBleedHero />
      <ProjectGrid />
      <SkillsSection />
      <AboutMe />
      <ContactForm />
    </div>
  );
}