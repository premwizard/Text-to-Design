import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-zinc-900 text-zinc-100 py-4 md:py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          TechSphere
        </Link>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
        <ul
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-4`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;