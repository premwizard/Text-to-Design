import React, { useState } from 'react';
export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    { id: 1, quote: 'TravelEase helped me plan the perfect trip to Japan!', author: 'Emily R.' },
    { id: 2, quote: 'I was able to book my dream vacation to Bali with TravelEase!', author: 'David K.' },
    { id: 3, quote: 'TravelEase made it easy for me to find the best deals on flights and hotels!', author: 'Sarah K.' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
      <div className="flex flex-col items-center">
        <div className="text-lg text-zinc-700 mb-4">{testimonials[activeIndex].quote}</div>
        <div className="text-lg font-bold">{testimonials[activeIndex].author}</div>
        <button className="bg-emerald-500 hover:opacity-90 transition-all duration-200 cursor-pointer text-white py-2 px-4 rounded" onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)}>Next</button>
      </div>
    </div>
  );
}