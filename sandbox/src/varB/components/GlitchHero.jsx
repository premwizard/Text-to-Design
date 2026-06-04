import React from 'react';

export default function GlitchHero() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      <h1 className="text-3xl font-bold text-cyan-400">Cybernetic Goods</h1>
      <h2 className="text-2xl font-bold text-gray-100">Gear Up for the Future.</h2>
      <button className="bg-cyan-400 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded">Explore</button>
    </div>
  );
}