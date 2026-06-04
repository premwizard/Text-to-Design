import React from 'react';

export default function FuturisticFooter() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      <p className="text-lg text-gray-100">&copy; 2024 Cybernetic Goods</p>
      <ul className="list-none text-lg text-gray-100">
        <li className="hover:opacity-90 transition-all duration-200 cursor-pointer">Contact Us</li>
        <li className="hover:opacity-90 transition-all duration-200 cursor-pointer">FAQ</li>
      </ul>
    </div>
  );
}