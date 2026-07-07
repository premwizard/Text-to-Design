import React from 'react';
import { FaArrowDown } from 'lucide-react';

function Home() {
  return (
    <div
      className="container mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 lg:py-28 bg-gradient-to-b from-slate-900 to-slate-800"
    >
      <h1
        className="text-3xl md:text-5xl lg:text-7xl font-sans font-bold text-zinc-100 mb-4 md:mb-6 lg:mb-8"
      >
        Welcome to Veloce
      </h1>
      <p
        className="text-zinc-100 text-lg md:text-xl lg:text-2xl text-center mb-8 md:mb-10 lg:mb-12"
      >
        Your premium shopping experience starts here
      </p>
      <div className="flex justify-center mb-8 md:mb-10 lg:mb-12">
        <a
          href="#"
          className="text-zinc-100 hover:text-gold-300 transition duration-300 ease-in-out"
        >
          Learn More
          <FaArrowDown className="ml-2 text-gold-300" />
        </a>
      </div>
    </div>
  );
}

export { Home };