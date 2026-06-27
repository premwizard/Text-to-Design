import React from 'react';
import { Star } from 'lucide-react';

const featuredProducts = [
  {
    id: 1, name: 'The Lumina Ring',
    price: '$2,800.00',
    image: 'https://images.unsplash.com/photo-1610444658742-c28669466e3b?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5,
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2, name: 'Scented Obsidian Candle',
    price: '$95.00',
    image: 'https://images.unsplash.com/photo-1605282470719-74e8927931c8?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 3, name: 'Silk Charmeuse Scarf',
    price: '$220.00',
    image: 'https://images.unsplash.com/photo-1587376664973-100d0244cfd5?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 4, name: 'Artisan Leather Wallet',
    price: '$350.00',
    image: 'https://images.unsplash.com/photo-1533038676054-20b197992929?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 5, name: 'Hand-blown Crystal Vase',
    price: '$480.00',
    image: 'https://images.unsplash.com/photo-1606997409259-215c26425974?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5,
    span: 'col-span-1 row-span-1',
  },
];

export default function FeaturedProductGrid() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-4xl md:text-5xl font-thin text-zinc-100 mb-12 text-center font-[Cormorant_Garamond]">
        Our Featured Selections
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 auto-rows-[280px] md:auto-rows-[350px]">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className={`relative group overflow-hidden rounded-lg shadow-xl bg-zinc-900 border border-zinc-800 ${product.span}`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

            {/* Product Info - always visible but subtle */}
            <div className="absolute bottom-0 left-0 p-4 text-zinc-100 w-full">
              <h3 className="text-lg md:text-xl font-light font-[Cormorant_Garamond] mb-1 group-hover:text-stone-100 transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-base text-zinc-300">{product.price}</p>
            </div>

            {/* Hover Reveal Details */}
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div classNameName="text-center">
                <p className="text-xl font-light text-zinc-100 mb-2 font-[Cormorant_Garamond]">{product.name}</p>
                <p className="text-lg text-zinc-300 mb-4">{product.price}</p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'text-stone-100' : 'text-zinc-600'} fill-current`}/>
                  ))}
                </div>
                <button className="bg-stone-100 text-zinc-950 px-6 py-2 rounded-full text-sm font-medium
                                   hover:opacity-90 transition-all duration-200 cursor-pointer">
                  Quick View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}