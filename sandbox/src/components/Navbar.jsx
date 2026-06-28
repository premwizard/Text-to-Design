import React, { useState } from 'react';
import { FaBars, FaTimes } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-zinc-600 py-4 px-6 text-zinc-400 shadow-md lg:px-12 lg:py-6">
      <a href="#" className="flex items-center font-sans font-bold text-lg">
        <img src="/dashsphere-logo" alt="DashSphere Logo" className="h-6 w-6 mr-2" />
        DashSphere
      </a>
      <button
        type="button"
        className="lg:hidden flex items-center"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <ul
        className={`lg:flex lg:items-center lg:justify-between transition-all duration-300 ${open ? 'lg:translate-x-0' : 'lg:translate-x-[-100%]'}`}
      >
        <li className="lg:mr-6">
          <a href="#" className="text-zinc-400 hover:bg-zinc-700 rounded-md px-4 py-2 transition-all duration-300">
            Home
          </a>
        </li>
        <li className="lg:mr-6">
          <a href="#" className="text-zinc-400 hover:bg-zinc-700 rounded-md px-4 py-2 transition-all duration-300">
            Features
          </a>
        </li>
        <li className="lg:mr-6">
          <a href="#" className="text-zinc-400 hover:bg-zinc-700 rounded-md px-4 py-2 transition-all duration-300">
            Pricing
          </a>
        </li>
        <li>
          <button
            type="button"
            className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-md px-4 py-2 transition-all duration-300"
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;