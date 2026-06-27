import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Portfolio', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="bg-zinc-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center font-bold text-2xl text-white font-dm-sans">
              <span className="text-zinc-300">Aura</span>
              <span className="text-zinc-500">Creative</span>
            </a>
            <p className="text-xs text-zinc-500 font-dm-sans -mt-1">Showcasing Innovation, Crafting Brilliance.</p>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-zinc-400 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-dm-sans transition duration-300 ease-in-out"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-zinc-700 inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white transition duration-300 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Menu className="block h-6 w-6" />
              ) : (
                <X className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-700" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-zinc-300 hover:bg-zinc-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium font-dm-sans transition duration-300 ease-in-out"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;