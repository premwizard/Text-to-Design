import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function IndustrialNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between py-4 border-b border-red-600">
      <h1 className="text-3xl font-bold text-red-600">CodeForge</h1>
      <button className="lg:hidden hover:opacity-90 transition-all duration-200 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul className={`lg:flex hidden ${isOpen ? 'block' : 'hidden'} py-4`}> 
        <li className="mr-6 hover:opacity-90 transition-all duration-200 cursor-pointer">Features</li>
        <li className="mr-6 hover:opacity-90 transition-all duration-200 cursor-pointer">Pricing</li>
        <li className="mr-6 hover:opacity-90 transition-all duration-200 cursor-pointer">About</li>
      </ul>
    </nav>
  );
}