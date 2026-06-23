import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function CompactNavbar({ brandName }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-neutral-100 shadow-sm py-4 px-6 lg:px-16 flex items-center justify-between">
      <div className="text-2xl font-bold text-teal-600 hover:opacity-90 cursor-pointer transition-all duration-200">
        {brandName}
      </div>
      <div className="hidden md:flex space-x-6 items-center">
        <a href="#" className="text-neutral-800 hover:text-teal-600 transition-all duration-200 cursor-pointer">Projects</a>
        <a href="#" className="text-neutral-800 hover:text-teal-600 transition-all duration-200 cursor-pointer">Services</a>
        <a href="#" className="text-neutral-800 hover:text-teal-600 transition-all duration-200 cursor-pointer">About</a>
        <a href="#" className="text-neutral-800 hover:text-teal-600 transition-all duration-200 cursor-pointer">Contact</a>
      </div>
      <button
        className="md:hidden text-neutral-800 focus:outline-none"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-100 shadow-md py-4 px-6 space-y-4">
          <a href="#" className="block text-neutral-800 hover:text-teal-600 transition-all duration-200 cursor-pointer">Projects</a>
          <a href="#" className="block text-neutral-800 hover:text-teal-600 transition-all duration-200 cursor-pointer">Services</a>
          <a href="#" className="block text-neutral-800 hover:text-teal-600 transition-all duration-200 cursor-pointer">About</a>
          <a href="#" className="block text-neutral-800 hover:text-teal-600 transition-all duration-200 cursor-pointer">Contact</a>
        </div>
      )}
    </nav>
  );
}