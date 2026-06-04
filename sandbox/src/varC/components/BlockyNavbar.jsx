import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function BlockyNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'WORK', href: '#work' },
    { name: 'PROCESS', href: '#process' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav className="bg-zinc-950 border-b-2 border-red-500 text-white p-4 font-mono z-50 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="text-3xl font-extrabold text-red-500 tracking-tighter uppercase cursor-pointer hover:opacity-90 transition-all duration-200" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          VisionaryWorks
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xl font-bold uppercase text-white hover:text-red-500 transition-colors duration-200 cursor-pointer hover:opacity-90"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-red-500 p-2 rounded-md hover:opacity-90 transition-all duration-200"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-t-2 border-red-500 absolute top-full left-0 w-full flex flex-col items-start p-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold uppercase text-white hover:text-red-500 transition-colors duration-200 block w-full py-2 px-4 border-b-2 border-zinc-700 last:border-b-0 hover:bg-zinc-800 cursor-pointer hover:opacity-90"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}