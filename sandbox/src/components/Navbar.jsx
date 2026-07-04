import React from 'react';
import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="flex justify-between items-center py-4 md:px-12 px-4 bg-white">
      <Link to="/" className="flex items-center">
        <House size={24} className="mr-2 text-zinc-900" aria-label="Home Icon" />
        <span className="text-lg font-bold text-zinc-900">Veloce</span>
      </Link>
      <button
        className="md:hidden flex justify-center w-8 h-8 bg-zinc-100 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Menu</span>
      </button>
      <ul
        className={`md:flex flex-grow justify-end ${isOpen ? 'block' : 'hidden'}
          md:items-center md:pb-0 pb-4 absolute md:static bg-white md:z-auto z-10 left-0 w-full md:w-auto md:pl-0 pl-4 md:pt-0 pt-4 md:shadow-none shadow-md`}
      >
        <li className="md:ml-8 md:my-0 my-4">
          <Link
            to="/"
            className="block text-zinc-900 hover:text-zinc-700 transition duration-200"
          >
            Home
          </Link>
        </li>
        <li className="md:ml-8 md:my-0 my-4">
          <Link
            to="/about"
            className="block text-zinc-900 hover:text-zinc-700 transition duration-200"
          >
            About
          </Link>
        </li>
        <li className="md:ml-8 md:my-0 my-4">
          <Link
            to="/contact"
            className="block text-zinc-900 hover:text-zinc-700 transition duration-200"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;