import React, { useState } from 'react';

export default function MonochromeHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const brandName = "Raw Vision Studio";

  return (
    <header className="py-6 px-6 lg:px-12 border-b-2 border-yellow-400 flex justify-between items-center relative z-50 bg-zinc-950">
      <div className="text-2xl font-bold text-yellow-400 uppercase tracking-wide">
        {brandName}
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Work</a>
        <a href="#" className="hover:text-yellow-400 transition-colors duration-200">About</a>
        <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Contact</a>
      </nav>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
        {!isOpen ? (
          <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        ) : (
          <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        )}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-zinc-950 md:hidden border-b-2 border-yellow-400 py-4 px-6 space-y-4">
          <a href="#" className="block hover:text-yellow-400 transition-colors duration-200">Work</a>
          <a href="#" className="block hover:text-yellow-400 transition-colors duration-200">About</a>
          <a href="#" className="block hover:text-yellow-400 transition-colors duration-200">Contact</a>
        </div>
      )}
    </header>
  );
}