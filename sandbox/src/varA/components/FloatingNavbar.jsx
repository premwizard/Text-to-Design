import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Collections', href: '#' },
    { name: 'New Arrivals', href: '#' },
    { name: 'About Solstice', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-zinc-950 bg-opacity-80 backdrop-blur-sm shadow-sm border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="text-2xl font-bold text-zinc-100 hover:opacity-90 transition-all duration-200 cursor-pointer font-[Cormorant_Garamond]">
          Solstice Lux
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-grow justify-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-zinc-300 hover:text-stone-100 transition-colors duration-200 text-lg"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Icons & Mobile Menu Button */}
        <div className="flex items-center gap-6">
          <Search className="text-zinc-300 hover:text-stone-100 transition-colors duration-200 cursor-pointer w-5 h-5 hidden md:block" />
          <ShoppingCart className="text-zinc-300 hover:text-stone-100 transition-colors duration-200 cursor-pointer w-5 h-5 hidden md:block" />
          <User className="text-zinc-300 hover:text-stone-100 transition-colors duration-200 cursor-pointer w-5 h-5 hidden md:block" />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-300 hover:text-stone-100 transition-colors duration-200 cursor-pointer p-1"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 pb-4">
          <div className="flex flex-col items-center space-y-4 pt-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-zinc-300 hover:text-stone-100 transition-colors duration-200 text-lg py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex gap-6 pt-4">
              <Search className="text-zinc-300 hover:text-stone-100 transition-colors duration-200 cursor-pointer w-6 h-6" />
              <ShoppingCart className="text-zinc-300 hover:text-stone-100 transition-colors duration-200 cursor-pointer w-6 h-6" />
              <User className="text-zinc-300 hover:text-stone-100 transition-colors duration-200 cursor-pointer w-6 h-6" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}