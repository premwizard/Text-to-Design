import React from 'react';

export default function HeroWithIllustration() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center py-12 md:py-20 lg:py-24">
      <div className="lg:w-1/2 md:px-8 xl:px-12 lg:px-16 flex flex-col items-center lg:items-start">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">The future of financial management, simplified.</h1>
        <p className="text-lg md:text-2xl lg:text-3xl mt-4 lg:mt-8">Streamline your finances with FinStride, the intelligent financial management platform.</p>
        <button className="bg-gold-500 text-white py-4 px-8 rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer mt-8 md:mt-12 lg:mt-16">Get Started</button>
      </div>
      <div className="lg:w-1/2 flex justify-center">
        <img src="https://via.placeholder.com/400x400" alt="Hero Illustration" className="md:w-1/2 lg:w-full xl:h-full lg:h-full object-contain lg:object-cover"/>
      </div>
    </div>
  );
}