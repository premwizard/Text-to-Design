import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Examples', href: '#examples' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-800 bg-opacity-70 backdrop-blur-md shadow-lg border-b border-zinc-700/50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-gray-50 flex items-center group">
          <Rocket className="mr-2 text-blue-400 group-hover:scale-110 transition-transform" size={28} />
          CognitoFlow
        </a>

        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-200 hover:text-blue-400 transition-all duration-200">
              {link.name}
            </a>
          ))}
          <button className="px-6 py-2 bg-blue-400 text-white rounded-full font-medium shadow-md hover:opacity-90 transition-all duration-200 cursor-pointer">
            Get Started
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-200 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-800 bg-opacity-80 backdrop-blur-md pb-4 border-t border-zinc-700/50">
          <div className="flex flex-col items-center space-y-4 pt-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-200 hover:text-blue-400 transition-all duration-200" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
            <button className="w-3/4 px-6 py-3 bg-blue-400 text-white rounded-full font-medium shadow-md hover:opacity-90 transition-all duration-200 cursor-pointer" onClick={() => setIsOpen(false)}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}