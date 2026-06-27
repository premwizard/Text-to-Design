import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategoryBlocks() {
  const categories = [
    {
      name: 'Sculptural Furniture',
      image: 'https://images.unsplash.com/photo-1593005822965-0c7f07b1e4c7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Bold forms from concrete, steel, and reclaimed wood.',
      link: '#',
    },
    {
      name: 'Industrial Lighting',
      image: 'https://images.unsplash.com/photo-1593005822965-0c7f07b1e4c7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Exposed elements, raw materials, intentional illumination.',
      link: '#',
    },
    {
      name: 'Raw Decor & Objects',
      image: 'https://images.unsplash.com/photo-1593005822965-0c7f07b1e4c7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Unfinished textures and monumental presence for any space.',
      link: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-stone-900 text-stone-100 border-b border-stone-700">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold font-['Space_Grotesk'] tracking-tighter mb-12 text-center md:text-left uppercase">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href={category.link}
              className={`group relative block bg-stone-800 border-2 border-stone-700 overflow-hidden
                          ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''} ${index === 1 ? 'lg:col-span-2' : ''}
                          hover:opacity-90 transition-opacity duration-300 cursor-pointer`}
              style={{ aspectRatio: index === 1 ? '16/9' : '4/3' }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
              <div className="relative p-6 md:p-8 flex flex-col justify-end h-full">
                <h3 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] leading-tight mb-2 uppercase text-stone-100 group-hover:text-red-600 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-md md:text-lg font-['Space_Mono'] text-stone-300 mb-4">
                  {category.description}
                </p>
                <span className="flex items-center text-red-600 uppercase font-bold font-['Space_Grotesk'] tracking-wider mt-2">
                  View All <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}