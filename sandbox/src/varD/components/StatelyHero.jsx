import React from 'react';

export default function StatelyHero() {
  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 flex flex-col justify-center items-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-800 text-center mb-4">LuminWorks</h1>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-800 text-center">Bringing Your Vision to Life with Creative Flair.</p>
      <button className="bg-rose-400 text-neutral-800 py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-200 cursor-pointer mt-8">Get Started</button>
    </section>
  );
}