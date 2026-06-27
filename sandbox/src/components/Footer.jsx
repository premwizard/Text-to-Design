import React from 'react';
import { useState } from 'react';
import { ArrowUp } from 'lucide-react-native';
import Link from 'next/link';

const Footer = () => {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className="bg-zinc-600 text-zinc-400 pt-12 pb-8 lg:pt-16 lg:pb-16">
      <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row justify-between items-center">
        <div className="lg:w-1/2 xl:w-1/3 mb-8 lg:mb-0">
          <h2 className="text-2xl font-bold text-zinc-200 mb-4">Aura Creative</h2>
          <p className="text-zinc-400">Showcasing Innovation, Crafting Brilliance.</p>
          <div className="flex mt-4">
            <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300 mr-4">About</Link>
            <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300 mr-4">Services</Link>
            <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition duration-300">Contact</Link>
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-1/3 mb-8 lg:mb-0">
          <h3 className="text-xl font-bold text-zinc-200 mb-4">Get in Touch</h3>
          <p className="text-zinc-400 mb-4">Email: <a href="mailto:info@auracreative.com" className="text-zinc-400 hover:text-zinc-200 transition duration-300">info@auracreative.com</a></p>
          <p className="text-zinc-400">Phone: <a href="tel:1234567890" className="text-zinc-400 hover:text-zinc-200 transition duration-300">1234567890</a></p>
        </div>
        <div className="lg:w-1/2 xl:w-1/3 text-right mb-8 lg:mb-0">
          <button className="bg-zinc-700 hover:bg-zinc-800 text-zinc-200 py-2 px-4 rounded-md transition duration-300">
            <Link href="#top">
              <ArrowUp size={20} className="mr-2" />
              Back to Top
            </Link>
          </button>
          <p className="text-zinc-400 mt-4">&copy; {year} Aura Creative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;