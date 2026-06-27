import React from 'react';

const collections = [
  {
    id: 1, name: 'Fine Jewelry',
    description: 'Timeless sparkle.',
    image: 'https://images.unsplash.com/photo-1612015509787-8c5e00344d5a?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    span: 'row-span-2 col-span-2'
  },
  {
    id: 2, name: 'Artisanal Home Decor',
    description: 'Refined living spaces.',
    image: 'https://images.unsplash.com/photo-1620868832103-cd0f6d5427d1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    span: 'row-span-1 col-span-1'
  },
  {
    id: 3, name: 'Premium Apparel',
    description: 'Elegance in every stitch.',
    image: 'https://images.unsplash.com/photo-1596707436034-e3498877e8a9?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    span: 'row-span-1 col-span-1'
  },
  {
    id: 4, name: 'Exclusive Timepieces',
    description: 'Precision and prestige.',
    image: 'https://images.unsplash.com/photo-1524805444738-e3bcd2627063?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    span: 'row-span-1 col-span-1'
  },
  {
    id: 5, name: 'Luxury Accessories',
    description: 'The perfect complement.',
    image: 'https://images.unsplash.com/photo-1636901861788-b22fb41c4912?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    span: 'row-span-1 col-span-1'
  },
];

export default function CuratedCollections() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-4xl md:text-5xl font-thin text-zinc-100 mb-12 text-center font-[Cormorant_Garamond]">
        Curated Collections
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 auto-rows-[250px] md:auto-rows-[300px]">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className={`relative group overflow-hidden rounded-lg shadow-xl ${collection.span}`}
          >
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 p-4 md:p-6 text-zinc-100">
              <h3 className="text-xl md:text-2xl font-light font-[Cormorant_Garamond] group-hover:text-stone-100 transition-colors duration-300">
                {collection.name}
              </h3>
              <p className="text-sm md:text-base text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                {collection.description}
              </p>
              <a href="#"
                 className="text-sm md:text-base text-stone-100 hover:underline mt-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
              >
                View All &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}