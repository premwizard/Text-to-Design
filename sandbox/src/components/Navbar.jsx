import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Changed ArrowRight to Menu/X for better UX

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm md:shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link to="/" className="text-slate-900 font-bold text-xl md:text-2xl lg:text-3xl tracking-tight">
          TechPulse
        </Link>
        <button
          className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul
          className={`fixed inset-x-0 top-[64px] bg-white shadow-lg p-4 flex flex-col space-y-4 md:static md:flex md:flex-row md:space-x-6 lg:space-x-10 md:space-y-0 md:p-0 md:shadow-none md:justify-end md:items-center transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}
            }`}
        >
          <li>
            <Link
              to="/"
              className="block text-slate-600 hover:text-slate-900 font-medium text-lg transition-colors duration-200 py-2 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block text-slate-600 hover:text-slate-900 font-medium text-lg transition-colors duration-200 py-2 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block text-slate-600 hover:text-slate-900 font-medium text-lg transition-colors duration-200 py-2 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200 text-lg">
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;