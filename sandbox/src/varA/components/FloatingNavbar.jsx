import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-4 fixed top-0 left-0 right-0 bg-zinc-950 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-zinc-100 text-lg font-bold">NexaHub</a>
        <button className="lg:hidden flex justify-center items-center w-8 h-8 bg-indigo-500 rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
        </button>
        <ul className={`lg:flex flex-grow justify-end items-center ${isOpen ? 'block' : 'hidden'} lg:static absolute top-full left-0 right-0 bg-zinc-950 py-4`}> 
          <li className="lg:ml-6 lg:py-0 py-2"><a href="#" className="text-zinc-100 hover:opacity-90 transition-all duration-200 cursor-pointer">Features</a></li>
          <li className="lg:ml-6 lg:py-0 py-2"><a href="#" className="text-zinc-100 hover:opacity-90 transition-all duration-200 cursor-pointer">Pricing</a></li>
          <li className="lg:ml-6 lg:py-0 py-2"><a href="#" className="text-zinc-100 hover:opacity-90 transition-all duration-200 cursor-pointer">About</a></li>
        </ul>
      </div>
    </nav>
  );
}