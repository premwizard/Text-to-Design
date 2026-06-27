import React from 'react';

export default function MinimalHero() {
  return (
    <section className="relative bg-stone-900 text-stone-100 py-24 md:py-48 px-6 md:px-12 overflow-hidden border-b border-stone-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        <div className="md:w-1/2 text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-['Space_Grotesk'] leading-tight tracking-tighter mb-6">
            Unfiltered objects.
            <br />
            Raw aesthetics.
          </h2>
          <p className="text-lg sm:text-xl font-['Space_Mono'] leading-relaxed mb-8 max-w-lg">
            Discover brutalist-inspired designs crafted from raw materials. Each piece embodies a commitment to unvarnished form and uncompromising function.
          </p>
          <a
            href="#products"
            className="inline-block bg-red-600 text-stone-100 uppercase text-lg sm:text-xl font-bold font-['Space_Grotesk'] tracking-wider
                       py-4 px-8 border-2 border-red-600
                       hover:bg-transparent hover:text-red-600 transition-all duration-300
                       hover:opacity-90 cursor-pointer"
          >
            Explore the Collection
          </a>
        </div>
        <div className="md:w-1/2 w-full mt-12 md:mt-0 relative">
          <img
            src="https://images.unsplash.com/photo-1616036735515-5c1a7e28a571?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Brutalist concrete sculpture on a pedestal"
            className="w-full h-auto object-cover border-2 border-stone-100 shadow-lg"
            style={{ aspectRatio: '4/3' }}
          />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-red-600 mix-blend-multiply opacity-50 z-0 hidden sm:block"></div>
          <div className="absolute -top-8 -right-8 w-48 h-48 bg-stone-700 mix-blend-multiply opacity-50 z-0 hidden sm:block"></div>
        </div>
      </div>
    </section>
  );
}