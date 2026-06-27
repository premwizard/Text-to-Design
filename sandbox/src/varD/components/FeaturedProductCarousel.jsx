import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

export default function FeaturedProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: 'EchoFlow Smart Speaker Pro',
      price: '$149.99',
      image: 'https://images.unsplash.com/photo-1546435770-a3e945c796b4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.8,
      reviews: 120,
    },
    {
      id: 2,
      name: 'Zenith OLED Monitor 27"',
      price: '$499.00',
      image: 'https://images.unsplash.com/photo-1593305841399-bfcd67732a39?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.9,
      reviews: 95,
    },
    {
      id: 3,
      name: 'AuraFlow Wireless Earbuds',
      price: '$89.50',
      image: 'https://images.unsplash.com/photo-1601918774783-a4c00ed91745?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.7,
      reviews: 210,
    },
    {
      id: 4,
      name: 'ChronoFit Smartwatch X1',
      price: '$199.99',
      image: 'https://images.unsplash.com/photo-1546872002-dcd7367c3311?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.6,
      reviews: 155,
    },
  ];

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-tl from-gray-100 to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 font-['DM Sans']">Featured Innovations</h2>

        <div className="relative flex justify-center items-center w-full">
          <button
            onClick={prevProduct}
            className="absolute left-0 md:-left-12 z-10 p-3 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 shadow-md text-gray-800 hover:text-purple-600 transition-all duration-200 cursor-pointer transform -translate-y-1/2 top-1/2"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row items-center transition-all duration-500 ease-in-out transform hover:scale-[1.01]">
            <div className="w-full md:w-1/2 aspect-video md:aspect-square flex-shrink-0">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-10 w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-3 font-['DM Sans']">{currentProduct.name}</h3>
              <p className="text-4xl font-extrabold text-purple-600 mb-4 font-['DM Sans']">{currentProduct.price}</p>
              <div classNameName="flex justify-center md:justify-start items-center mb-5">
                <div className="flex items-center text-yellow-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < Math.floor(currentProduct.rating) ? "currentColor" : "none"} stroke={i < Math.floor(currentProduct.rating) ? "none" : "currentColor"} className="mr-1" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-['DM Sans']">({currentProduct.reviews} reviews)</span>
              </div>
              <p className="text-gray-700 text-lg mb-6 font-['DM Sans']">
                Experience the next level of innovation. Limited stock available.
              </p>
              <button className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-200 cursor-pointer shadow-md">
                Add to Cart
              </button>
            </div>
          </div>

          <button
            onClick={nextProduct}
            className="absolute right-0 md:-right-12 z-10 p-3 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 shadow-md text-gray-800 hover:text-purple-600 transition-all duration-200 cursor-pointer transform -translate-y-1/2 top-1/2"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-purple-600' : 'bg-gray-300 hover:bg-gray-400'} cursor-pointer`}
              aria-label={`Go to product ${idx + 1}`}
            ></button>
          ))}
        </div>

      </div>
    </section>
  );
}