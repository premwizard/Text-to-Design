import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function IntroSplash() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 lg:px-24 bg-gray-50 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}>
          Crafting digital experiences that resonate and inspire.
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto">
          At Aura Canvas, we blend innovative design with robust technology to create web solutions that captivate audiences and drive results.
        </p>
        <a
          href="#projects"
          className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-700 hover:bg-indigo-800 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 group"
        >
          Explore Our Work
          <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </section>
  );
}