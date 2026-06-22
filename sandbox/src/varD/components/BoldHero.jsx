import React from 'react';

export default function BoldHero() {
  return (
    <div className="container mx-auto p-12 pt-24 md:p-24">
      <h1 className="text-5xl font-bold leading-tight">CoreBlock</h1>
      <p className="text-2xl">Uncompromisingly robust infrastructure for your digital needs.</p>
      <button className="bg-red-500 hover:opacity-90 transition-all duration-200 cursor-pointer py-4 px-8 rounded-lg text-lg font-bold">Get Started</button>
    </div>
  );
}