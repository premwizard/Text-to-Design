import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react-native';
import Link from 'next/link';

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <footer className="bg-zinc-600 text-zinc-400 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-zinc-200 font-bold mb-4">Vestia</h3>
            <p className="text-zinc-400 mb-4">Elevate Your Style</p>
            <ul>
              <li className="mb-2">
                <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-zinc-200 font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300">
                  Featured Products
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-zinc-200 font-bold mb-4">Subscribe</h3>
            <p className="text-zinc-400 mb-4">Get the latest updates and promotions</p>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full py-2 pl-10 text-zinc-400 bg-zinc-700 rounded-md focus:outline-none focus:ring-zinc-200"
              />
              <button
                type="submit"
                className="mt-4 py-2 px-4 bg-zinc-800 text-zinc-200 rounded-md hover:bg-zinc-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-zinc-200 font-bold mb-4">Follow Us</h3>
            <ul>
              <li className="mb-2">
                <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300">
                  Facebook
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300">
                  Instagram
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-700 pt-8">
          <p className="text-zinc-400">
            &copy; 2023 Vestia. All rights reserved.
          </p>
          <button
            onClick={toggleCollapse}
            className="mt-4 py-2 px-4 bg-zinc-800 text-zinc-200 rounded-md hover:bg-zinc-700 transition duration-300"
          >
            {isOpen ? 'Less' : 'More'} <ArrowUp size={16} />
          </button>
          {isOpen && (
            <div className="mt-4">
              <p className="text-zinc-400">This is some additional content</p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;