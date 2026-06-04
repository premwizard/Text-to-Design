import React from 'react';

export default function InvitingHero() {
  return (
    <div className="container mx-auto p-12 pt-24 md:p-24 lg:p-32 xl:p-40">
      <h1 className="text-3xl md:text-5xl lg:text-7xl xl:text-9xl font-bold text-stone-700 mb-4">Willow Creek Home</h1>
      <p className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-stone-700 mb-8">Bringing Warmth to Your Home.</p>
      <button className="bg-green-600 hover:opacity-90 transition-all duration-200 cursor-pointer text-stone-100 py-2 px-4 rounded-lg">Explore Our Collection</button>
    </div>
  );
}