import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40 text-center px-6 md:px-8 lg:px-16">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        background: 'radial-gradient(circle at center, rgba(99,102,241,0.1) 0%, transparent 70%)'
      }}></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 leading-tight mb-6">
          Elevate Your Vision. Effortlessly.
        </h1>
        <p className="text-xl sm:text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          AetherFlow empowers creators and businesses with intuitive tools to bring their ideas to life,
          seamlessly and with stunning results.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto">
            Explore Features <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 text-indigo-300 border border-indigo-500/50 text-lg font-semibold rounded-xl shadow-lg hover:bg-indigo-900/40 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
            Learn More
          </button>
        </div>
      </div>
      {/* Optional: Add a subtle visual element like a blurred sphere or a pattern */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </section>
  );
};

export default HeroSection;