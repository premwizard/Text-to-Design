import React from 'react';
import { Link } from 'react-router-dom';
import { House } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <nav className="bg-white py-4 md:py-6 lg:py-8 fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-indigo-500 text-2xl font-bold">NexusApp</Link>
        <ul className="hidden md:flex items-center space-x-4">
          <li>
            <Link to="#portfolio" className="text-slate-900 hover:text-indigo-500 transition duration-300">Portfolio</Link>
          </li>
          <li>
            <Link to="#about" className="text-slate-900 hover:text-indigo-500 transition duration-300">About</Link>
          </li>
          <li>
            <Link to="#contact" className="text-slate-900 hover:text-indigo-500 transition duration-300">Contact</Link>
          </li>
        </ul>
        <button className="md:hidden text-indigo-500 hover:text-fuchsia-500 transition duration-300">
          <House size={24} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;