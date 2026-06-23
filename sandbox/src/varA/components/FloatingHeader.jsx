import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function FloatingHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 shadow-sm py-4 px-6 md:px-12 lg:px-24 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-gray-900 hover:opacity-90 transition-all duration-200 cursor-pointer" style={{ fontFamily: 'Playfair Display, serif' }}>
          Aura Canvas
        </a>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-indigo-700 transition-colors duration-200 text-lg"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-indigo-700 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
          <nav className="flex flex-col space-y-4 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-indigo-700 transition-colors duration-200 text-xl font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}