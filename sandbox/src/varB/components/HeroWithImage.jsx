import React from 'react';

export default function HeroWithImage() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 lg:pt-24 xl:pt-28">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="bg-gray-900 rounded-3xl p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-100">PixelCraft</h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-100">Crafting Digital Experiences with Art and Code</p>
          </div>
          <div className="flex-1">
            <img src="https://picsum.photos/400/300" alt="PixelCraft" className="w-full h-full object-cover rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}