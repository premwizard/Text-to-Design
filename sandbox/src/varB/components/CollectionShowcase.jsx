import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CollectionShowcase() {
  const collections = [
    {
      id: 1,
      name: 'Spring Equinox \'24',
      description: 'Lightweight fabrics and vibrant hues inspired by renewal.',
      image: 'https://images.unsplash.com/photo-1627771746270-381c195f2d22?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      name: 'Urban Echoes Capsule',
      description: 'Modern silhouettes for the city dweller, blending comfort with edge.',
      image: 'https://images.unsplash.com/photo-1621695420959-1e34e56598c1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      name: 'Heritage Knitwear',
      description: 'Timeless knits handcrafted with traditional techniques and natural fibers.',
      image: 'https://images.unsplash.com/photo-1555545283-4a1614777591?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] text-center mb-16 md:mb-24 text-neutral-900">
          Curated Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {collections.map((collection) => (
            <div key={collection.id} className="group relative overflow-hidden rounded-lg shadow-xl bg-white">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="p-6 text-center">
                <h3 className="text-3xl font-['Playfair_Display'] text-neutral-900 mb-3">
                  {collection.name}
                </h3>
                <p className="text-lg text-neutral-700 mb-6">
                  {collection.description}
                </p>
                <button className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 text-white text-md tracking-wide uppercase font-medium
                                   hover:opacity-90 transition-all duration-200 cursor-pointer">
                  View Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}