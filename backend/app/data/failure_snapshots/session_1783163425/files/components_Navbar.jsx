import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-white py-4 md:py-6 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-zinc-900 hover:text-zinc-700 transition-colors duration-300">
          SynapseFlow
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-zinc-700 hover:text-zinc-900 font-medium transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-zinc-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </a>
              </li>
            ))}
          </ul>
          <button className="px-6 py-2 bg-gradient-to-r from-zinc-700 to-zinc-900 text-white font-medium rounded-md hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-700 hover:text-zinc-900 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden py-4 border-t border-zinc-100 animate-slide-down">
            <ul className="flex flex-col items-center space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-700 hover:text-zinc-900 font-medium text-lg block py-2 px-4"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button className="px-8 py-3 mt-2 bg-gradient-to-r from-zinc-700 to-zinc-900 text-white font-medium rounded-md hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2">
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;