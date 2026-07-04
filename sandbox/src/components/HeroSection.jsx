import React from 'react';

function HeroSection() {
  return (
    <section className="bg-white py-10 md:py-16 lg:py-20">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-zinc-900 mb-4 md:mb-6 lg:mb-8">Unlock powerful insights with your data.</h1>
        <p className="text-lg md:text-xl lg:text-2xl text-zinc-900 mb-8 md:mb-10 lg:mb-12 text-center">Discover the power of data-driven decision making with MetricStream.</p>
        <button className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100 py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 rounded-md transition duration-200">Get Started</button>
      </div>
    </section>
  );
}

export default HeroSection;