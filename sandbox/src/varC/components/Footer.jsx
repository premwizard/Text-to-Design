import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white py-8 flex justify-center items-center">
      <p className="text-lg md:text-2xl lg:text-3xl"> 2023 FinStride. All rights reserved.</p>
      <ul className="flex space-x-4 mt-4 lg:mt-8">
        <li><a className="text-gray-800 hover:text-gold-500 transition-all duration-200" href="#">Features</a></li>
        <li><a className="text-gray-800 hover:text-gold-500 transition-all duration-200" href="#">Pricing</a></li>
        <li><a className="text-gray-800 hover:text-gold-500 transition-all duration-200" href="#">About</a></li>
      </ul>
    </footer>
  );
}