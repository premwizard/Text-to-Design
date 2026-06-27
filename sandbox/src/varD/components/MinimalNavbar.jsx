import React, { useState } from 'react';

export default function MinimalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Features', href: '#' },
    { name: 'Demo', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Support', href: '#' },
  ];

  return (
    <nav className="py-6 px-6 lg:px-12 sticky top-0 z-50 backdrop-blur-md bg-neutral-950/70 border-b border-neutral-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-2xl font-bold text-gray-300 hover:opacity-90 transition-all duration-200 cursor-pointer">NoirFlow</a>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
              {item.name}
            </a>
          ))}
          <button className="px-6 py-2 border border-gray-300 text-gray-300 rounded-lg hover:bg-gray-300 hover:text-neutral-950 transition-all duration-200">
            Sign In
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:opacity-90 transition-all duration-200">
            {!isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="block text-gray-300 hover:text-gray-100 transition-colors duration-200">
              {item.name}
            </a>
          ))}
          <button className="w-full py-3 border border-gray-300 text-gray-300 rounded-lg hover:bg-gray-300 hover:text-neutral-950 transition-all duration-200">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
}