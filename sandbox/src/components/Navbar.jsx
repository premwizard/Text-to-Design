import React from 'react';
import { Link } from 'react-router-dom';
import lucide from 'lucide-react';
import './index.css';

function Navbar() {
  return (
    <nav className="bg-white py-4 shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold text-slate-900">
          <lucide.Icon name="paint-brush" size={24} className="mr-2" />
          Showcase Your Art
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="text-slate-900 hover:text-slate-800 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className="text-slate-900 hover:text-slate-800 transition duration-300">
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-slate-900 hover:text-slate-800 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className="text-slate-900 hover:text-slate-800 transition duration-300">
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-slate-900 hover:text-slate-800 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;