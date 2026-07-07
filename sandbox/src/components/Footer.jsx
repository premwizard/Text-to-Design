import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-100 py-4 md:py-6 lg:py-8 flex flex-col items-center space-y-4 md:space-y-6 lg:space-y-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center space-y-4 md:space-y-6 lg:space-y-8">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-100">
          TechForge
        </h2>
        <ul className="flex flex-wrap justify-center space-x-4 md:space-x-6 lg:space-x-8">
          <li>
            <Link to="/" className="text-lg md:text-xl lg:text-2xl text-zinc-100 hover:text-zinc-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="text-lg md:text-xl lg:text-2xl text-zinc-100 hover:text-zinc-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/" className="text-lg md:text-xl lg:text-2xl text-zinc-100 hover:text-zinc-200">
              Contact
            </Link>
          </li>
        </ul>
        <p className="text-lg md:text-xl lg:text-2xl text-zinc-100">
          &copy; 2023 TechForge. All rights reserved.
        </p>
        <button className="bg-zinc-100 text-zinc-900 py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 rounded-md md:rounded-lg lg:rounded-xl hover:bg-zinc-200 flex items-center space-x-2">
          <Heart size={20} />
          <span>Made with love by TechForge</span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;