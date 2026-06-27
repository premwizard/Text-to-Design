import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';

export default function DynamicHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Shop', href: '#' },
    { name: 'Designers', href: '#' },
    { name: 'Collections', href: '#' },
    { name: 'Journal', href: '#' },
    { name: 'About', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold font-['Playfair_Display'] text-neutral-900 transition-all duration-200 hover:opacity-90">
            Atelier Noire
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-neutral-800 text-lg hover:text-neutral-900 transition-all duration-200 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <ShoppingCart className="h-6 w-6 text-neutral-800 hover:text-neutral-900 transition-all duration-200 cursor-pointer" />
          <User className="h-6 w-6 text-neutral-800 hover:text-neutral-900 transition-all duration-200 cursor-pointer" />
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? (
              <X className="h-7 w-7 text-neutral-800 transition-all duration-200" />
            ) : (
              <Menu className="h-7 w-7 text-neutral-800 transition-all duration-200" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="flex flex-col items-center py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-neutral-800 text-xl font-medium hover:text-neutral-900 transition-all duration-200 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}