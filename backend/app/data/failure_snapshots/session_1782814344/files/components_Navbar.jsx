import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="relative bg-zinc-950/80 backdrop-blur-sm shadow-lg py-4 px-6 md:px-12 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo/Name */}
        <a href="#" className="text-3xl font-extrabold font-heading text-emerald-400 hover:text-emerald-300 transition-colors">
          AetherFlow
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-zinc-300 text-lg font-medium hover:text-emerald-400 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <button className="ml-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-100 hover:text-emerald-400 transition-colors">
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-900/95 backdrop-blur-md pb-6 md:hidden shadow-xl rounded-b-xl">
          <div className="flex flex-col items-center space-y-6 pt-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-200 text-xl font-medium hover:text-emerald-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                    onClick={() => setIsOpen(false)}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;