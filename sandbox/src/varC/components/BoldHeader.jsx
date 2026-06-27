import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

export default function BoldHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Shop', href: '#' },
    { name: 'Collections', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <header className="bg-stone-900 border-b border-stone-700 py-4 px-6 md:px-12 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] tracking-tighter text-stone-100">
          <a href="#" className="hover:text-red-600 transition-colors duration-200">Concrete Goods</a>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-100 text-lg uppercase tracking-wider font-semibold font-['Space_Mono']
                         hover:text-red-600 transition-colors duration-200
                         hover:opacity-90 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <button className="text-stone-100 hover:text-red-600 transition-colors duration-200 hover:opacity-90 cursor-pointer">
            <ShoppingCart size={24} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-stone-100 hover:text-red-600 transition-colors duration-200 hover:opacity-90 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-stone-900 bg-opacity-95 flex flex-col items-center justify-center space-y-8 md:hidden z-40">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-100 text-4xl uppercase font-bold font-['Space_Grotesk'] tracking-wider
                         hover:text-red-600 transition-colors duration-200
                         hover:opacity-90 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}