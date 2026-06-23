import React from 'react';

export default function AboutMe() {
  return (
    <section className="py-20 px-8 relative">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <img 
            src="https://via.placeholder.com/600x800/e0ffff/ffffff?text=Studio+Portrait"
            alt="Inkwell Studios Team Member"
            className="w-full h-auto rounded-lg shadow-2xl object-cover"
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-5xl font-bold mb-8 text-gray-900 leading-tight">Crafting Stories, Building Brands</h2>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            Inkwell Studios is a creative powerhouse dedicated to transforming visions into compelling visual narratives. We partner with brands that dare to be bold, helping them connect with their audience on a deeper, more meaningful level.
          </p>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            Our approach blends meticulous editorial aesthetics with dynamic storytelling, ensuring every project is not just seen, but felt. From concept to execution, we pour passion and precision into every pixel.
          </p>
          <button className="bg-pink-500 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer">
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
}