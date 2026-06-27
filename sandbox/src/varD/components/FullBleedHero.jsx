import React from 'react';

export default function FullBleedHero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 opacity-70"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-gray-300">
          Streamline Your Workflow with Elegant Simplicity.
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-400">
          NoirFlow empowers your team to achieve peak productivity with intuitive tools designed for clarity and focus.
        </p>
        <div className="flex justify-center space-x-6">
          <button className="px-8 py-4 bg-gray-300 text-neutral-950 font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:opacity-90">
            Get Started Free
          </button>
          <button className="px-8 py-4 border border-gray-300 text-gray-300 rounded-lg font-semibold hover:bg-gray-300 hover:text-neutral-950 transition-all duration-300 hover:opacity-90">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}