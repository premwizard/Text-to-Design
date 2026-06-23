import React from 'react';

export default function BrutalistFooter() {
  const brandName = "Raw Vision Studio";
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 lg:px-12 border-t-2 border-yellow-400 bg-zinc-950">
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
        <div className="text-lg font-bold text-yellow-400 uppercase tracking-wide">
          {brandName}
        </div>
        <div className="text-sm text-gray-400">
          © {year} {brandName}. All rights reserved. Raw vision is the only vision.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Privacy</a>
          <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Terms</a>
          <a href="#" className="hover:text-yellow-400 transition-colors duration-200">License</a>
        </div>
      </div>
    </footer>
  );
}