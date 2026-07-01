import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="relative bg-white text-zinc-900">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand */}
        <a href="#" className="text-2xl font-bold text-zinc-900 hover:text-zinc-700 transition-colors duration-300">
          LuminShop
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-zinc-700 hover:text-zinc-900 relative group transition-colors duration-300"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </a>
          ))}
          <button className="relative p-2 rounded-md hover:bg-zinc-100 transition-colors duration-300">
            <ShoppingCart className="h-6 w-6 text-zinc-700" />
            <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-zinc-500 text-white text-xs font-bold">
              0
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="relative p-2 rounded-md hover:bg-zinc-100 transition-colors duration-300">
            <ShoppingCart className="h-6 w-6 text-zinc-700" />
            <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-zinc-500 text-white text-xs font-bold">
              0
            </span>
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-zinc-100 transition-colors duration-300">
            {isOpen ? <X className="h-6 w-6 text-zinc-900" /> : <Menu className="h-6 w-6 text-zinc-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-2 text-lg font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 rounded-md transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;