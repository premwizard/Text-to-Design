import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Generate', href: '#generate' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] max-w-screen-xl">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full px-4 py-2 flex justify-between items-center shadow-lg">
        <a href="#" className="flex items-center space-x-2 text-xl font-bold text-gray-50 hover:opacity-90 transition-all duration-200 cursor-pointer h1">
          <Sparkles className="text-blue-500" size={24} />
          <span className="font-space-grotesk">SynthAI</span>
        </a>

        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-200 hover:text-blue-500 transition-colors duration-200 font-inter"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer text-sm font-medium">
            Sign In
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-200 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full mt-2 w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg shadow-lg py-4 animated-slide-down">
          <ul className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-200 hover:text-blue-500 transition-colors duration-200 font-inter"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer text-sm font-medium">
                Sign In
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}