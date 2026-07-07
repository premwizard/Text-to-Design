import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Globe } from 'lucide-react';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-500 p-4 shadow-md z-10">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Globe className="w-8 h-8 mr-2 text-white" />
          <span className="text-lg font-bold text-white">NexusApp</span>
        </Link>
        <button className="lg:hidden bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;