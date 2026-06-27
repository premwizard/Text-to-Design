import React from 'react';

export default function GalleryHero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548074917-a10c7104b904?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute inset-0 bg-zinc-950 bg-opacity-40 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-thin leading-tight text-zinc-100 tracking-wide mb-6 font-[Cormorant_Garamond]">
          Elevate your everyday with curated elegance.
        </h1>
        <p className="text-lg sm:text-xl text-zinc-200 max-w-2xl mb-8 font-light">
          Discover exquisite pieces designed to inspire and enchant.
        </p>
        <button className="bg-stone-100 text-zinc-950 px-8 py-3 rounded-full text-lg font-medium tracking-wide
                           hover:opacity-90 transition-all duration-300 ease-in-out shadow-lg transform hover:-translate-y-1">
          Explore Collections
        </button>
      </div>
    </section>
  );
}