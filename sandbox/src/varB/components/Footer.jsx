import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100">&copy; 2024 PixelCraft</p>
          <button className="bg-cyan-400 hover:opacity-90 transition-all duration-200 cursor-pointer rounded-3xl px-4 sm:px-6 lg:px-8 xl:px-10 py-2 sm:py-4 lg:py-6 xl:py-8 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-100 mt-4 sm:mt-6 lg:mt-8 xl:mt-10">Contact Us</button>
        </div>
      </div>
    </footer>
  );
}