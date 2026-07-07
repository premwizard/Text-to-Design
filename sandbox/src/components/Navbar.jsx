import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-zinc-900 text-zinc-100 py-4 md:py-6 lg:py-8 flex justify-between items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-lg md:text-xl lg:text-2xl font-bold">
          TechForge
        </Link>
        <ul className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <li>
            <Link to="/" className="hover:text-zinc-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-zinc-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-zinc-200">
              Contact
            </Link>
          </li>
        </ul>
        <button className="bg-zinc-100 text-zinc-900 py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 rounded-md md:rounded-lg lg:rounded-xl hover:bg-zinc-200 flex items-center space-x-2">
          <span>Get Started</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;