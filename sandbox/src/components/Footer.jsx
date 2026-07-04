import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-100 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <p className="text-lg md:text-xl lg:text-2xl text-zinc-100 mb-4 md:mb-6 lg:mb-8">
          &copy; 2024 TechPulse. All rights reserved.
        </p>
        <ul className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
          <li>
            <Link to="#" className="hover:text-zinc-400 transition duration-200">
              About
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-zinc-400 transition duration-200">
              Services
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-zinc-400 transition duration-200">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;