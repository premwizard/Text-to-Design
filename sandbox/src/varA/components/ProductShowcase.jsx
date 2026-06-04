import React from 'react';

export default function ProductShowcase() {
  const products = [
    { id: 1, name: 'Luxury Watch', price: 999.99, image: 'https://via.placeholder.com/300' },
    { id: 2, name: ' Designer Handbag', price: 599.99, image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Gold Necklace', price: 299.99, image: 'https://via.placeholder.com/300' }
  ];

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-zinc-800 mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col justify-center items-center">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
            <h3 className="text-2xl font-bold text-zinc-800 mb-2">{product.name}</h3>
            <p className="text-xl text-zinc-800 mb-4">${product.price}</p>
            <button className="bg-pink-400 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded-md text-zinc-800 text-lg">Buy Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}