import React from 'react';
import { Menu, X } from 'lucide-react';

export default function TransparentHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-stone-950 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-stone-100">Echoes Digital</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden hover:opacity-90 transition-all duration-200 cursor-pointer">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`lg:flex items-center ${isOpen ? 'block' : 'hidden'} lg:space-x-4`}>
          <li><a href="#" className="text-stone-100 hover:opacity-90 transition-all duration-200 cursor-pointer">Home</a></li>
          <li><a href="#" className="text-stone-100 hover:opacity-90 transition-all duration-200 cursor-pointer">About</a></li>
          <li><a href="#" className="text-stone-100 hover:opacity-90 transition-all duration-200 cursor-pointer">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}