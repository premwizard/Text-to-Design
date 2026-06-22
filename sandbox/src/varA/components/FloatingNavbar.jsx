import React, { useState, useEffect } from 'react';

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 ${scrolled ? 'bg-zinc-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-cyan-500">LuminaFlow</div>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
          <button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors shadow-md shadow-cyan-500/30">Login</button>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button className="text-gray-100 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
    </nav>
  );
}