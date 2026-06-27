import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function GradientHero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36 bg-gradient-to-br from-purple-100 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 font-['DM Sans']">
          Your hub for cutting-edge essentials.
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-10 font-['DM Sans']">
          Discover innovative tech, smart gadgets, and premium accessories designed to elevate your everyday life.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition-all duration-200 cursor-pointer flex items-center justify-center">
            Shop All Products <ArrowRight size={20} className="ml-2" />
          </button>
          <button className="bg-white text-purple-600 border border-purple-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-purple-50 transition-all duration-200 cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
      {/* Gradient divider at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
}