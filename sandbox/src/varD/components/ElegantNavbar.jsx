import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function ElegantNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-6 flex justify-between items-center">
      <h1 className="text-lg font-bold text-neutral-800">LuminWorks</h1>
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-rose-400 hover:opacity-90 transition-all duration-200 cursor-pointer">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul className={`lg:flex items-center ${isOpen ? 'block' : 'hidden'} lg:space-x-6`}> 
        <li><a href="#" className="text-neutral-800 hover:text-rose-400 transition-all duration-200 cursor-pointer">Home</a></li>
        <li><a href="#" className="text-neutral-800 hover:text-rose-400 transition-all duration-200 cursor-pointer">About</a></li>
        <li><a href="#" className="text-neutral-800 hover:text-rose-400 transition-all duration-200 cursor-pointer">Contact</a></li>
      </ul>
    </nav>
  );
}