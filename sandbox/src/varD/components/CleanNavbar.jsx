import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';

export default function CleanNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#' },
    { name: 'Categories', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 shadow-lg backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-gray-800 font-['DM Sans']">Nexus Market</a>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-purple-600 font-medium transition-colors duration-200 cursor-pointer font-['DM Sans']"
              >
                {link.name}
              </a>
            ))}
            <ShoppingCart className="text-gray-800 hover:text-purple-600 transition-colors duration-200 cursor-pointer" size={20} />
            <User className="text-gray-800 hover:text-purple-600 transition-colors duration-200 cursor-pointer" size={20} />
          </div>

          <div className="md:hidden flex items-center">
            <ShoppingCart className="text-gray-800 mr-4 hover:text-purple-600 transition-colors duration-200 cursor-pointer" size={20} />
            <User className="text-gray-800 mr-4 hover:text-purple-600 transition-colors duration-200 cursor-pointer" size={20} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600 transition-all duration-200 cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer font-['DM Sans']"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}