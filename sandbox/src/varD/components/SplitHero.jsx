import React from 'react';

export default function SplitHero() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen">
      <div className="lg:w-1/2 flex justify-center items-center">
        <h1 className="text-5xl font-bold">Velocity</h1>
        <h2 className="text-2xl mt-4">Accelerate Your Growth</h2>
        <button className="bg-purple-500 hover:opacity-90 transition-all duration-200 cursor-pointer text-zinc-100 py-2 px-4 rounded">Get Started</button>
      </div>
      <div className="lg:w-1/2 h-screen flex justify-center items-center bg-purple-500/50 rounded-lg backdrop-blur-lg">...</div>
    </div>
  );
}