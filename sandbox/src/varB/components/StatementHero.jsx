import React from 'react';

export default function StatementHero() {
  const tagline = "Unfiltered creativity. Bold statements. Real impact.";
  const description = "We craft digital experiences that don't just look good, they resonate. Raw Vision Studio is a collective of designers and developers pushing the boundaries of visual communication.";

  return (
    <section className="relative py-20 lg:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-yellow-400/10 skew-y-6 transform -translate-y-1/4"></div>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="lg:col-span-1">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-yellow-400">
            {tagline}
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed text-gray-300">
            {description}
          </p>
          <div className="mt-10">
            <button className="px-8 py-4 bg-yellow-400 text-zinc-950 font-bold uppercase hover:bg-yellow-300 transition-colors duration-200 shadow-lg shadow-yellow-400/30">
              Explore Our Work
            </button>
          </div>
        </div>
        <div className="lg:col-span-1 flex justify-center lg:justify-end">
          <div className="w-full max-w-md lg:max-w-lg aspect-square bg-yellow-400/10 border-4 border-yellow-400 flex items-center justify-center p-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-center text-yellow-400 uppercase transform rotate-3 skew-x-3">
              RAW VISION
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}