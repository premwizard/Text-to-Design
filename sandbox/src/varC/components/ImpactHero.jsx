import React from 'react';

export default function ImpactHero() {
  return (
    <section id="hero" className="relative py-20 sm:py-32 md:py-48 text-center border-b-2 border-red-500 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-tight tracking-tighter text-white uppercase mb-8 drop-shadow-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Unconventional Design.<br />Unforgettable Impact.
        </h1>
        <p className="text-xl sm:text-2xl text-red-500 font-bold mb-10 tracking-wide">
          VisionaryWorks crafts digital experiences that cut through the noise.
        </p>
        <a
          href="#contact"
          className="inline-block bg-red-500 text-white text-xl sm:text-2xl font-bold px-10 py-5 uppercase border-2 border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-200 cursor-pointer shadow-red-500 shadow-md"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Begin Your Project
        </a>
      </div>
    </section>
  );
}