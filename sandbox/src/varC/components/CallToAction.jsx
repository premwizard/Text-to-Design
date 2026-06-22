import React from 'react';

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-pink-500 to-purple-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
          Ready to Transform Your Design Process?
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl mb-12 text-white text-opacity-90 max-w-3xl mx-auto">
          Experience the future of creative assistance. Sign up for Artisan AI today and start building amazing things.
        </p>
        <button className="bg-white text-pink-500 font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 cursor-pointer">
          Start Your Free Trial
        </button>
      </div>
    </section>
  );
}