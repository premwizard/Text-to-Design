import React from 'react';
import { Link } from 'react-router-dom';
import { Browser } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-zinc-900 text-zinc-100 py-4 md:py-6 lg:py-8">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
          TechPulse
        </h1>
        <ul className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
          <li>
            <Link to="#" className="hover:text-zinc-400 transition duration-200">
              About
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-zinc-400 transition duration-200">
              Services
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-zinc-400 transition duration-200">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;