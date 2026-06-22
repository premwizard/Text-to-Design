import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CenteredHero() {
  const brandName = "SynergyHub";
  const tagline = "Your all-in-one workspace for collaboration and productivity.";

  return (
    <section className="relative py-20 md:py-32 lg:py-40 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gray-900">
          {brandName}: <span className="text-blue-500">{tagline}</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-700">
          Streamline your projects, connect your teams, and achieve more with a unified platform designed for the modern digital age.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600 hover:opacity-90 transition-all duration-200 cursor-pointer">
            Get Started
          </button>
          <button className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-white hover:opacity-90 transition-all duration-200 cursor-pointer">
            Learn More <ArrowRight className="inline-block ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}