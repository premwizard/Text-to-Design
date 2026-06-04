import React, { useState } from 'react';

export default function ProductCards() {
  const [expanded, setExpanded] = useState([]);
  const products = [
    { id: 1, name: 'Cozy Throw Blanket', price: 49.99, description: 'Soft and cozy throw blanket made from 100% cotton' },
    { id: 2, name: 'Wooden Decorative Box', price: 29.99, description: 'Handcrafted wooden decorative box with intricate designs' },
    { id: 3, name: 'Scented Candle Set', price: 39.99, description: 'Set of 3 scented candles with calming fragrances' }
  ];

  return (
    <div className="container mx-auto p-12 pt-12 md:p-24 lg:p-32 xl:p-40 flex flex-wrap justify-center">
      {products.map((product) => (
        <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
            <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-stone-700 mb-2">{product.name}</h2>
            <p className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-stone-700 mb-4">${product.price}</p>
            <button className="bg-green-600 hover:opacity-90 transition-all duration-200 cursor-pointer text-stone-100 py-2 px-4 rounded-lg" onClick={() => setExpanded((prev) => [...prev, product.id])}>View Details</button>
            {expanded.includes(product.id) && (
              <div className="mt-4">
                <p className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-stone-700 mb-4">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}