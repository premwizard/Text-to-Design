import React, { useState } from 'react';

export default function DynamicProductGrid() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Cyberdeck', price: 999.99 },
    { id: 2, name: 'Smartgun', price: 499.99 },
    { id: 3, name: 'Exosuit', price: 1999.99 },
    { id: 4, name: 'Hacking Tool', price: 99.99 },
    { id: 5, name: 'Advanced Scanner', price: 299.99 }
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-800 p-4 rounded hover:opacity-90 transition-all duration-200 cursor-pointer">
          <h3 className="text-lg font-bold text-gray-100">{product.name}</h3>
          <p className="text-sm text-gray-100">${product.price}</p>
          <button className="bg-cyan-400 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}