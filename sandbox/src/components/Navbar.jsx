import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 text-zinc-100 shadow-md py-4 md:py-6 lg:py-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg md:text-xl lg:text-2xl font-bold">MetricStream</Link>
        <button
          className="lg:hidden flex justify-center w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul className={`lg:flex justify-center items-center ${isOpen ? 'block' : 'hidden'} lg:space-x-4`}>
          <li className="py-2 lg:py-0">
            <Link to="/" className="hover:text-zinc-200 transition duration-200">Home</Link>
          </li>
          <li className="py-2 lg:py-0">
            <Link to="/" className="hover:text-zinc-200 transition duration-200">About</Link>
          </li>
          <li className="py-2 lg:py-0">
            <Link to="/" className="hover:text-zinc-200 transition duration-200">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;