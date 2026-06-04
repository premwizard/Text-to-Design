import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function DashboardHeader({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold text-zinc-50">PrismAnalytics</h1>
        <button className="lg:hidden flex justify-center w-8 h-8 bg-green-400 hover:opacity-90 transition-all duration-200 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`lg:flex items-center ${mobileMenuOpen ? 'block' : 'hidden'} lg:space-x-4`}>
          <li><a href="#" className="text-zinc-50 hover:opacity-90 transition-all duration-200 cursor-pointer">Dashboard</a></li>
          <li><a href="#" className="text-zinc-50 hover:opacity-90 transition-all duration-200 cursor-pointer">Reports</a></li>
          <li><a href="#" className="text-zinc-50 hover:opacity-90 transition-all duration-200 cursor-pointer">Settings</a></li>
        </ul>
      </nav>
    </header>
  );
}