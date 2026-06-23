import React from 'react';

export default function GreetingHeader() {
  const tagline = "Precision in design, elegance in execution.";
  return (
    <header className="container mx-auto px-6 py-16 lg:py-32 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        Pixelcraft Collective:
        <span className="text-teal-600"> Elevating Digital Experiences</span>
      </h1>
      <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto mb-8">
        {tagline}
      </p>
      <div className="flex justify-center space-x-4">
        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer">
          View Our Work
        </button>
        <button className="border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-all duration-200 cursor-pointer">
          Get In Touch
        </button>
      </div>
    </header>
  );
}