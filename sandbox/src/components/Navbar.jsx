import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import logo from '../assets/logo.svg';

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-indigo-500 text-lg font-bold">
          <img src={logo} alt="NexusApp" className="h-8" />
        </Link>
        <button className="lg:hidden flex justify-center items-center">
          <Menu size={24} className="text-indigo-500" />
        </button>
        <ul className="hidden lg:flex items-center space-x-4">
          <li>
            <Link to="/" className="text-slate-900 hover:text-indigo-500 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/" className="text-slate-900 hover:text-indigo-500 transition duration-300">Features</Link>
          </li>
          <li>
            <Link to="/" className="text-slate-900 hover:text-indigo-500 transition duration-300">Pricing</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;