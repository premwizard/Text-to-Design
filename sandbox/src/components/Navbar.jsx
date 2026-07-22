import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-slate-900 font-bold text-lg">
          NexusApp
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="text-slate-900 hover:text-indigo-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="text-slate-900 hover:text-indigo-500">
              Features
            </Link>
          </li>
          <li>
            <Link to="/" className="text-slate-900 hover:text-indigo-500">
              Pricing
            </Link>
          </li>
        </ul>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Get Started
          <ArrowRight className="ml-2" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;