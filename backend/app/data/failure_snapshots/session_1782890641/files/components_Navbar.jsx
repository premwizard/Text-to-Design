import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-white text-zinc-900 fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-zinc-900">
          ApexFlow
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-zinc-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </a>
          ))}
          <a
            href="#contact"
            className="ml-6 px-6 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-700 transition-colors duration-300 font-medium"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-900 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-4 border-t border-zinc-100">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-zinc-700 hover:text-zinc-900 transition-colors duration-300 py-2"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-6 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-700 transition-colors duration-300 font-medium mt-4"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;