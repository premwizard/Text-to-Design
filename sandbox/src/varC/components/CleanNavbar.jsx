import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function CleanNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 flex justify-between items-center">
      <h2 className="text-lg font-bold">FinStride</h2>
      <button
        className="md:hidden flex justify-center w-8 h-8 bg-gold-500 text-white rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul className={`md:flex hidden justify-end items-center ${isMenuOpen ? 'flex' : 'hidden'} md:space-x-4`}> 
        <li><a className="text-gray-800 hover:text-gold-500 transition-all duration-200" href="#">Features</a></li>
        <li><a className="text-gray-800 hover:text-gold-500 transition-all duration-200" href="#">Pricing</a></li>
        <li><a className="text-gray-800 hover:text-gold-500 transition-all duration-200" href="#">About</a></li>
      </ul>
    </nav>
  );
}