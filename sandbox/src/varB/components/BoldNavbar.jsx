import React from 'react';
import { Menu, X } from 'lucide-react';

export default function BoldNavbar() {
  const [mobileMenu, setMobileMenu] = React.useState(false);

  return (
    <nav className="flex justify-between items-center py-4 lg:px-12 md:px-6 px-4 border-b border-gray-600">
      <h2 className="text-lg font-bold">ChromaCraft</h2>
      <ul className="hidden lg:flex items-center space-x-4">
        <li><a href="#" className="text-white hover:opacity-90 transition-all duration-200 cursor-pointer">Home</a></li>
        <li><a href="#" className="text-white hover:opacity-90 transition-all duration-200 cursor-pointer">Portfolio</a></li>
        <li><a href="#" className="text-white hover:opacity-90 transition-all duration-200 cursor-pointer">About</a></li>
      </ul>
      <button className="lg:hidden flex items-center text-white hover:opacity-90 transition-all duration-200 cursor-pointer" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? <X size={24} /> : <Menu size={24} />}
      </button>
      {mobileMenu && (
        <ul className="flex lg:hidden flex-col items-center mt-4">
          <li><a href="#" className="text-white hover:opacity-90 transition-all duration-200 cursor-pointer">Home</a></li>
          <li><a href="#" className="text-white hover:opacity-90 transition-all duration-200 cursor-pointer">Portfolio</a></li>
          <li><a href="#" className="text-white hover:opacity-90 transition-all duration-200 cursor-pointer">About</a></li>
        </ul>
      )}
    </nav>
  );
}