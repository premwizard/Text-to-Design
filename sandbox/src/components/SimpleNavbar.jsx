import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function SimpleNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-white/30 backdrop-blur-md border border-gray-200 shadow-lg rounded-b-xl mx-4 mt-4 md:mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8 z-50">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0">
          <a href="#" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
            Selectify
          </a>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200 hover:opacity-90">Features</a>
          <a href="#demo" className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200 hover:opacity-90">Demo</a>
          <a href="#pricing" className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200 hover:opacity-90">Pricing</a>
          <a href="#contact" className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200 hover:opacity-90">Contact</a>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2 transition-all duration-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <a href="#features" className="block text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 hover:opacity-90">Features</a>
          <a href="#demo" className="block text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 hover:opacity-90">Demo</a>
          <a href="#pricing" className="block text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 hover:opacity-90">Pricing</a>
          <a href="#contact" className="block text-gray-800 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 hover:opacity-90">Contact</a>
        </div>
      )}
    </nav>
  );
}