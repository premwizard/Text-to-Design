import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function SidebarNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-4 md:fixed md:top-0 md:left-0 md:right-0 md:z-10 md:h-16 md:bg-zinc-900 md:flex md:justify-between md:items-center md:py-0 md:px-4 lg:px-12 xl:px-24">
      <div className="flex items-center">
        <img src="https://via.placeholder.com/50x50" alt="QuantifyAI" className="h-12 w-12 mr-2 lg:h-16 lg:w-16" />
        <h2 className="text-lg font-medium text-gray-200">QuantifyAI</h2>
      </div>
      <button className="lg:hidden hover:opacity-90 transition-all duration-200 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul className={`lg:flex lg:items-center ${mobileMenuOpen ? 'block' : 'hidden'} md:block md:ml-10`}>
        <li className="py-2 md:py-0 md:mr-4 lg:mr-6 xl:mr-8">
          <a href="#" className="text-gray-200 hover:opacity-90 transition-all duration-200 cursor-pointer">Dashboard</a>
        </li>
        <li className="py-2 md:py-0 md:mr-4 lg:mr-6 xl:mr-8">
          <a href="#" className="text-gray-200 hover:opacity-90 transition-all duration-200 cursor-pointer">Analytics</a>
        </li>
        <li className="py-2 md:py-0 md:mr-4 lg:mr-6 xl:mr-8">
          <a href="#" className="text-gray-200 hover:opacity-90 transition-all duration-200 cursor-pointer">Settings</a>
        </li>
      </ul>
    </nav>
  );
}