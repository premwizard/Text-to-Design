import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="py-8 md:px-12 px-4 bg-zinc-100 text-zinc-900">
      <div className="container mx-auto p-4 md:p-6 lg:p-12 bg-zinc-100 rounded-md shadow-md">
        <ul className="flex flex-wrap justify-center mb-8 md:mb-12 lg:mb-16">
          <li className="md:mr-8 mr-4 md:my-0 my-4">
            <Link
              to="/"
              className="block text-zinc-900 hover:text-zinc-700 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li className="md:mr-8 mr-4 md:my-0 my-4">
            <Link
              to="/about"
              className="block text-zinc-900 hover:text-zinc-700 transition duration-200"
            >
              About
            </Link>
          </li>
          <li className="md:mr-8 mr-4 md:my-0 my-4">
            <Link
              to="/contact"
              className="block text-zinc-900 hover:text-zinc-700 transition duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
        <p className="text-lg text-zinc-900 text-center">
          2024 Veloce. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;