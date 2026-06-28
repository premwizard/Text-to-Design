import React, { useState } from 'react';
import { FaLongArrowAltRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen sm:h-screen md:h-screen lg:h-screen xl:h-screen 2xl:h-screen bg-zinc-900 bg-no-repeat"
    >
      <div className="flex flex-col items-center justify-center h-screen sm:h-screen md:h-screen lg:h-screen xl:h-screen 2xl:h-screen bg-zinc-900 bg-no-repeat">
        <h1 className="text-5xl font-bold text-zinc-400 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl">
          Visualize your data, unlock insights
        </h1>
        <div className="flex flex-row items-center justify-center mt-8">
          <h2 className="text-3xl font-bold text-zinc-400 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
            Unlock the power of data-driven decision making
          </h2>
          <FaLongArrowAltRight className="ml-2 text-3xl text-zinc-400 hover:text-zinc-500" />
        </div>
        <button
          className="bg-zinc-600 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-500 mt-8 font-bold py-2 px-4 rounded-md"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;