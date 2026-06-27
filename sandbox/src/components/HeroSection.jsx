import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white font-['Outfit', sans-serif] antialiased">
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/noise.png')] animate-noise"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32 lg:py-48 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 font-['Outfit', sans-serif]">
            Aura Creative
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-12 text-gray-300 leading-relaxed font-['Inter']">
            Crafting Digital Experiences, Beautifully.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
            <button className="flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-xl transform hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out">
              Get Started
              <ArrowRight className="ml-3 w-5 h-5" />
            </button>
            <button className="flex items-center px-8 py-4 bg-transparent text-indigo-300 font-semibold rounded-full border-2 border-indigo-600 shadow-md transform hover:scale-105 hover:bg-indigo-700/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out">
              <PlayCircle className="mr-3 w-6 h-6 text-indigo-400" />
              Watch Demo
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="relative w-full max-w-md lg:max-w-xl aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-indigo-700/50 bg-gradient-to-br from-gray-800 to-black transform transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="relative w-full h-full rounded-xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/30 p-6">
                <h3 className="text-2xl font-bold mb-3 text-indigo-300 font-['Outfit', sans-serif]">Project Showcase</h3>
                <p className="text-gray-400 mb-6 font-['Inter']">Explore our latest digital creations.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300 font-['Inter']">Status: Live</span>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow transform hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out">View Project</button>
                </div>
              </div>
            </div>
            <div className="absolute top-8 left-8 w-24 h-24 bg-indigo-500/30 rounded-full filter blur-3xl opacity-70"></div>
            <div className="absolute bottom-8 right-8 w-32 h-32 bg-purple-500/20 rounded-full filter blur-3xl opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;