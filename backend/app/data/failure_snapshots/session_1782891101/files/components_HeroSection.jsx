import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-white py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Subtle background gradient for a premium feel, but minimal approach */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-white -z-10"></div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-900 leading-tight mb-6">
          Discover simplicity in every purchase.
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 max-w-2xl mx-auto mb-10">
          Experience a seamless shopping journey with LuminShop. Quality products, effortlessly yours.
        </p>
        <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-zinc-900 rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-all duration-300 ease-in-out group">
          Shop Now
          <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;