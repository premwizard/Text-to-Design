import React from 'react';
export default function HeroCarousel() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-4">Explore The World</h1>
      <p className="text-lg text-zinc-700 mb-8">With TravelEase, discover new destinations and experiences</p>
      <button className="bg-emerald-500 hover:opacity-90 transition-all duration-200 cursor-pointer text-white py-2 px-4 rounded">Get Started</button>
    </div>
  );
}