import React, { useRef, useEffect, useState } from 'react';
import FloatingNavbar from './components/FloatingNavbar';
import HeroSection from './components/HeroSection';
import ProjectShowcase from './components/ProjectShowcase';
import AboutMe from './components/AboutMe';
import ContactForm from './components/ContactForm';

export default function App() {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    hero: heroRef,
    projects: projectsRef,
    about: aboutRef,
    contact: contactRef,
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', sans-serif; }
      `}</style>
      
      <FloatingNavbar sectionRefs={sectionRefs} />

      <main className="overflow-hidden">
        <section id="hero" ref={heroRef} className="h-screen w-full flex items-center justify-center">
          <HeroSection />
        </section>
        <section id="projects" ref={projectsRef} className="h-screen w-full flex items-center justify-center p-4">
          <ProjectShowcase />
        </section>
        <section id="about" ref={aboutRef} className="h-screen w-full flex items-center justify-center p-4">
          <AboutMe />
        </section>
        <section id="contact" ref={contactRef} className="h-screen w-full flex items-center justify-center p-4">
          <ContactForm />
        </section>
      </main>
    </div>
  );
}