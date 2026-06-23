import React from 'react';

export default function FullBleedHero() {
  const tagline = "Visual Storytelling for Bold Brands";
  const brandName = "Inkwell Studios";

  return (
    <section className="relative h-screen flex items-center justify-center text-center p-8">
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080/f0e68c/ffffff?text=Hero+Background')" }}></div>
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-900 leading-tight">
          {brandName}
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl mb-12 text-gray-800 leading-relaxed">
          {tagline}
        </p>
        <button className="bg-pink-500 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer">
          Explore Our Work
        </button>
      </div>
    </section>
  );
}