import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaFile } from 'lucide-react';
import companyLogo from 'https://source.unsplash.com/400x400/?company-logo';

function Navbar() {
  return (
    <nav className="bg-white py-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={companyLogo} alt="Company Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-playfair-display">FocalPoint</h1>
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="text-slate-900 hover:text-primary">
              <FaHome size={20} />
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className="text-slate-900 hover:text-primary">
              <FaUser size={20} />
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className="text-slate-900 hover:text-primary">
              <FaFile size={20} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;