import React, { useState } from 'react';
import { ArrowDown, Menu, Moon, Sun } from 'lucide-react-native';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="bg-zinc-900 text-zinc-200 shadow-2xl relative flex justify-between items-center py-4 md:py-6 lg:py-8">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-400 hover:text-indigo-600 transition duration-200">
          NexaTech
        </Link>
        <span className="text-lg text-zinc-400 ml-2 md:ml-4 lg:ml-6">
          Elevate Your Digital Horizon
        </span>
      </div>
      <ul className={`md:flex items-center justify-end absolute top-16 md:static md:py-0 md:px-0 py-4 px-4 bg-zinc-900 shadow-2xl rounded-xl ${isOpen ? 'block' : 'hidden'} md:block`}>
        <li className="md:mr-6 lg:mr-8">
          <Link to="/" className="text-zinc-200 hover:text-indigo-400 transition duration-200">
            Home
          </Link>
        </li>
        <li className="md:mr-6 lg:mr-8">
          <Link to="/about" className="text-zinc-200 hover:text-indigo-400 transition duration-200">
            About
          </Link>
        </li>
        <li className="md:mr-6 lg:mr-8">
          <Link to="/contact" className="text-zinc-200 hover:text-indigo-400 transition duration-200">
            Contact
          </Link>
        </li>
        <li className="md:mr-6 lg:mr-8">
          <button className="flex items-center text-zinc-200 hover:text-indigo-400 transition duration-200" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </li>
      </ul>
      <button className="md:hidden text-zinc-200 hover:text-indigo-400 transition duration-200" onClick={toggleMenu}>
        {isOpen ? <ArrowDown size={20} /> : <Menu size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;