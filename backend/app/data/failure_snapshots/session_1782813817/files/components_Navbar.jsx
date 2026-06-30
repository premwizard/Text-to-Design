import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="relative z-50 bg-slate-950/80 backdrop-blur-lg border-b border-gray-800 shadow-xl rounded-b-xl mx-4 sm:mx-8 lg:mx-16 my-4 py-4 px-6 md:px-10 flex justify-between items-center">
      <div className="flex items-center">
        <a href="#" className="text-2xl font-bold text-indigo-400 font-space-grotesk tracking-tight">
          AetherFlow
        </a>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 items-center">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-zinc-300 hover:text-indigo-400 transition-colors duration-300 text-lg font-medium"
          >
            {link.name}
          </a>
        ))}
        <button className="ml-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105">
          Get Started
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-gray-800 shadow-lg py-4 flex flex-col items-center space-y-4 rounded-b-xl mx-4 sm:mx-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-zinc-200 hover:text-indigo-400 transition-colors duration-300 text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 w-fit">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;