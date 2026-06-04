import React from 'react';

export default function OurStorySection() {
  return (
    <div className="container mx-auto p-12 pt-24 md:p-24 lg:p-32 xl:p-40">
      <h2 className="text-3xl md:text-5xl lg:text-7xl xl:text-9xl font-bold text-stone-700 mb-4">Our Story</h2>
      <p className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-stone-700 mb-8">At Willow Creek Home, we believe that every home deserves to be warm and inviting. Our team of skilled artisans and designers work together to create unique and functional pieces that bring warmth and character to any space.</p>
      <button className="bg-green-600 hover:opacity-90 transition-all duration-200 cursor-pointer text-stone-100 py-2 px-4 rounded-lg">Learn More</button>
    </div>
  );
}