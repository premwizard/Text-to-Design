import React from 'react';

export default function VideoHero() {
  return (
    <section className="relative bg-stone-950 py-20 lg:py-40">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="https://example.com/video.mp4" type="video/mp4" />
      </video>
      <div className="container mx-auto flex flex-col items-center justify-center text-stone-100">
        <h1 className="text-5xl font-bold">Bringing your vision to life with immersive digital narratives.</h1>
        <p className="text-lg text-stone-100 mt-4">We're Echoes Digital, a creative agency that specializes in crafting captivating digital experiences.</p>
        <button className="bg-purple-500 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded-md mt-8">Learn More</button>
      </div>
    </section>
  );
}