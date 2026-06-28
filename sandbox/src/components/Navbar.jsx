import React, { useState } from 'react';
import { Bell, Menu,Moon, Sun, X } from 'lucide-react-native';
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
    <nav className="bg-zinc-600 py-4 md:py-6 lg:py-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-zinc-400 hover:text-zinc-200">
          Vestia
        </Link>
        <button
          className="md:hidden flex justify-center w-8 h-8 bg-zinc-600 hover:bg-zinc-700 rounded-md"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
        </button>
        <ul
          className={`md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8 ${
            isOpen ? 'flex flex-col space-y-4' : 'hidden'
          } md:space-y-0`}
        >
          <li>
            <Link
              to="/"
              className="text-zinc-400 hover:text-zinc-200 transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-zinc-400 hover:text-zinc-200 transition duration-300 ease-in-out"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-zinc-400 hover:text-zinc-200 transition duration-300 ease-in-out"
            >
              Contact
            </Link>
          </li>
          <li>
            <button
              className="flex justify-center w-8 h-8 bg-zinc-600 hover:bg-zinc-700 rounded-md"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={24} color="#fff" /> : <Moon size={24} color="#fff" />}
            </button>
          </li>
          <li>
            <button
              className="flex justify-center w-8 h-8 bg-zinc-600 hover:bg-zinc-700 rounded-md"
            >
              <Bell size={24} color="#fff" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;