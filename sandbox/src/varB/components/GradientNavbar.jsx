import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function GradientNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Solutions', href: '#' },
    { name: 'Company', href: '#' },
  ];

  return (
    <nav className="relative z-50 py-4 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-gray-100 hover:opacity-90 transition-all duration-200 cursor-pointer h1">
          ChronoPay
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-300 hover:text-blue-500 transition-all duration-200 cursor-pointer"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-gray-100 border border-blue-500 rounded-lg hover:bg-blue-500 hover:border-blue-500 transition-all duration-200 cursor-pointer">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 cursor-pointer">
              Sign Up
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-100 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-900 absolute top-full left-0 w-full pb-4 shadow-xl">
          <ul className="flex flex-col items-center space-y-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-300 hover:text-blue-500 transition-all duration-200 cursor-pointer block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button className="w-full px-6 py-2 text-gray-100 border border-blue-500 rounded-lg hover:bg-blue-500 hover:border-blue-500 transition-all duration-200 cursor-pointer">
                Login
              </button>
            </li>
            <li>
              <button className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 cursor-pointer">
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}