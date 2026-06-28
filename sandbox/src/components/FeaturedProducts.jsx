import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 1, title: 'New Arrivals' },
    { id: 2, title: 'Best Sellers' },
    { id: 3, title: 'Trending' },
  ];

  const products = [
    { id: 1, title: 'Product 1', price: 99.99, image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Product 3', price: 29.99, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-400 mb-2">Featured Products</h2>
        <div className="flex flex-wrap justify-center mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-zinc-400 bg-zinc-600 hover:bg-zinc-700 rounded-md md:rounded-lg lg:rounded-xl ${
                activeTab === tab.id ? 'bg-zinc-700' : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-600 hover:bg-zinc-700 rounded-md md:rounded-lg lg:rounded-xl p-4 sm:p-6 md:p-8 lg:p-10"
          >
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-zinc-400 mb-2">{product.title}</h3>
            <p className="text-zinc-400 mb-4">${product.price}</p>
            <button className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-zinc-400 bg-zinc-600 hover:bg-zinc-700 rounded-md md:rounded-lg lg:rounded-xl">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-zinc-400 bg-zinc-600 hover:bg-zinc-700 rounded-md md:rounded-lg lg:rounded-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />} View More
        </button>
      </div>
      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-600 hover:bg-zinc-700 rounded-md md:rounded-lg lg:rounded-xl p-4 sm:p-6 md:p-8 lg:p-10"
            >
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-zinc-400 mb-2">{product.title}</h3>
              <p className="text-zinc-400 mb-4">${product.price}</p>
              <button className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-zinc-400 bg-zinc-600 hover:bg-zinc-700 rounded-md md:rounded-lg lg:rounded-xl">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;