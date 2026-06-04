import React from 'react';

export default function FeaturedDesigner() {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-zinc-800 mb-4">Featured Designer</h2>
      <div className="flex flex-col justify-center items-center">
        <img src="https://via.placeholder.com/300" alt="Designer Image" className="w-full h-64 object-cover mb-4" />
        <h3 className="text-2xl font-bold text-zinc-800 mb-2">Alexander Wang</h3>
        <p className="text-lg text-zinc-800 mb-4">New York-based fashion designer known for his sleek and sophisticated designs.</p>
        <button className="bg-pink-400 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded-md text-zinc-800 text-lg">Learn More</button>
      </div>
    </section>
  );
}