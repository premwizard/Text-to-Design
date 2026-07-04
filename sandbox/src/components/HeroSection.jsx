import React from 'react';

function HeroSection() {
  return (
    <section className="py-12 md:px-12 px-4 md:mx-auto lg:mx-auto xl:mx-auto">
      <div className="container mx-auto p-4 md:p-6 lg:p-12 bg-white rounded-md shadow-md">
        <h1 className="text-5xl font-bold text-zinc-900 mb-8 md:mb-12 lg:mb-16">
          Elevate Your Shopping Experience
        </h1>
        <p className="text-lg text-zinc-900 mb-12 md:mb-16 lg:mb-20">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="bg-zinc-900 hover:bg-zinc-700 transition duration-200 py-2 md:py-4 lg:py-6 px-4 md:px-8 lg:px-12 text-lg text-white rounded-md">
          Explore
        </button>
      </div>
    </section>
  );
}

export default HeroSection;