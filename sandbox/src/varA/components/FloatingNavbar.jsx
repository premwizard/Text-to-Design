import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function FloatingNavbar({ sectionRefs }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionName) => {
    const ref = sectionRefs[sectionName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close menu on navigation
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7, // Adjust threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Projects', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 lg:p-6 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 cursor-pointer transition-all duration-200 hover:opacity-90"
            onClick={() => scrollToSection('hero')}>ArtisanAlloy</h2>
        
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative text-gray-800 text-lg font-medium transition-all duration-200 cursor-pointer hover:opacity-90
                ${activeSection === item.id ? 'text-purple-500' : ''}`}
            >
              {item.name}
              {activeSection === item.id && (
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-purple-500 rounded-full transition-all duration-300"></span>
              )}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 bg-white/15 backdrop-blur-lg rounded-lg shadow-xl py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-6 py-2 text-xl font-medium text-gray-800 hover:bg-white/20 transition-all duration-200 cursor-pointer
                ${activeSection === item.id ? 'text-purple-500 font-semibold' : ''}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}