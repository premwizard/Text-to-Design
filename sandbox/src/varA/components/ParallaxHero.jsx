import React from 'react';

export default function ParallaxHero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <h1 className="text-5xl font-bold text-zinc-800 mb-4">AuraLuxe</h1>
      <p className="text-2xl text-zinc-800 mb-8">Exquisite Fashion, Delivered.</p>
      <button className="bg-pink-400 hover:opacity-90 transition-all duration-200 cursor-pointer py-4 px-8 rounded-md text-zinc-800 text-xl">Explore</button>
    </section>
  );
}