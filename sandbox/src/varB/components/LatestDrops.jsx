import React from 'react';
import { Star } from 'lucide-react';

export default function LatestDrops() {
  const products = [
    {
      id: 1,
      name: 'Luna Silk Dress',
      price: '€320.00',
      image: 'https://images.unsplash.com/photo-1617469601007-8e6d23485ed4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 5,
    },
    {
      id: 2,
      name: 'Horizon Linen Trousers',
      price: '€180.00',
      image: 'https://images.unsplash.com/photo-1617013890250-716d1f93f66c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4,
    },
    {
      id: 3,
      name: 'Aurora Knit Sweater',
      price: '€250.00',
      image: 'https://images.unsplash.com/photo-1611099684175-520e54011ef9?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 5,
    },
    {
      id: 4,
      name: 'Crimson Tailored Blazer',
      price: '€410.00',
      image: 'https://images.unsplash.com/photo-1621695420959-1e34e56598c1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4,
    },
  ];

  const renderStars = (rating) => {
    return Array(5).fill(null).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-neutral-900' : 'text-gray-300'} fill-current`}
      />
    ));
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] text-center mb-16 md:mb-24 text-neutral-900">
          Latest Drops
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white shadow-lg overflow-hidden rounded-lg">
              <div className="relative h-96 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button className="w-full py-3 bg-neutral-900 text-white text-md uppercase font-medium
                                     hover:opacity-90 transition-all duration-200 cursor-pointer">
                    Quick Add
                  </button>
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-medium text-neutral-800 mb-2 font-['Playfair_Display']">
                  {product.name}
                </h3>
                <p className="text-lg text-neutral-700 mb-3">{product.price}</p>
                <div className="flex justify-center items-center gap-1 mb-2">
                  {renderStars(product.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-10 py-4 bg-neutral-900 text-white text-lg tracking-wider uppercase font-medium
                             hover:opacity-90 transition-all duration-200 cursor-pointer">
            View All New Arrivals
          </button>
        </div>
      </div>
    </section>
  );
}