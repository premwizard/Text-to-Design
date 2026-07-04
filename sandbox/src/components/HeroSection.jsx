import React from 'react';

function HeroSection() {
  return (
    <section className="bg-white py-12 md:py-20 lg:py-28">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-zinc-900 mb-4 md:mb-6 lg:mb-8">
          Unlock Data Insights with Ease
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-zinc-600 text-center mb-8 md:mb-12 lg:mb-16">
          Discover how TechPulse can help you make data-driven decisions
        </p>
        <button className="bg-zinc-900 text-zinc-100 py-2 md:py-4 lg:py-6 px-4 md:px-8 lg:px-12 rounded-md hover:bg-zinc-800 transition duration-200">
          Get Started
        </button>
      </div>
    </section>
  );
}

export default HeroSection;