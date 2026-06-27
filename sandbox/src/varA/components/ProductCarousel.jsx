import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const carouselProducts = [
  {
    id: 1, name: 'Essence of Purity Necklace',
    price: '$1,200.00',
    image: 'https://images.unsplash.com/photo-1627063229715-11504936d6a0?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5,
  },
  {
    id: 2, name: 'Velvet Dream Slippers',
    price: '$180.00',
    image: 'https://images.unsplash.com/photo-1627768228185-5c128e08d6d6?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4,
  },
  {
    id: 3, name: 'Whispering Willow Scarf',
    price: '$280.00',
    image: 'https://images.unsplash.com/photo-1603597818780-e37456d956f4?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5,
  },
  {
    id: 4, name: 'Celestial Glow Serum',
    price: '$110.00',
    image: 'https://images.unsplash.com/photo-1541703632906-8b2b7373f0f7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4,
  },
  {
    id: 5, name: 'Modernist Desk Lamp',
    price: '$450.00',
    image: 'https://images.unsplash.com/photo-1605371946864-cd25a07c1b50?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5,
  },
  {
    id: 6, name: 'Satin Sleep Mask Set',
    price: '$65.00',
    image: 'https://images.unsplash.com/photo-1587568571876-0f339f997645?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4,
  },
];

export default function ProductCarousel() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-4xl md:text-5xl font-thin text-zinc-100 mb-12 text-center font-[Cormorant_Garamond]">
        New Arrivals & Bestsellers
      </h2>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto custom-scrollbar-hide snap-x snap-mandatory gap-6 pb-6 lg:pb-0"
        >
          {carouselProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64 snap-start group relative bg-zinc-900 rounded-lg overflow-hidden shadow-lg border border-zinc-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-light text-zinc-100 mb-1 font-[Cormorant_Garamond]">{product.name}</h3>
                <p className="text-zinc-300 text-sm mb-2">{product.price}</p>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'text-stone-100' : 'text-zinc-600'} fill-current`}/>
                  ))}
                </div>
              </div>
              {/* Hover to reveal quick view */}
              <div className="absolute inset-0 bg-zinc-950 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-stone-100 text-zinc-950 px-6 py-2 rounded-full text-sm font-medium
                                   hover:opacity-90 transition-all duration-200 cursor-pointer">
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - hover reveal */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-stone-100 bg-opacity-80 p-2 rounded-full shadow-md text-zinc-950
                     hover:opacity-90 transition-opacity duration-300 z-10
                     ${isHovered ? 'opacity-100' : 'opacity-0'} hidden md:block`}
          aria-label="Scroll left"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-stone-100 bg-opacity-80 p-2 rounded-full shadow-md text-zinc-950
                     hover:opacity-90 transition-opacity duration-300 z-10
                     ${isHovered ? 'opacity-100' : 'opacity-0'} hidden md:block`}
          aria-label="Scroll right"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </section>
  );
}