import React from 'react';

export default function TestimonialSection() {
  const testimonials = [
    { quote: 'Quote 1', author: 'Author 1' },
    { quote: 'Quote 2', author: 'Author 2' },
    { quote: 'Quote 3', author: 'Author 3' }
  ];

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h2 className="text-3xl mb-4">What Our Customers Say</h2>
      {testimonials.map((testimonial, index) => (
        <div key={index} className="mb-4 bg-stone-800 p-4 rounded-lg">
          <p>{testimonial.quote}</p>
          <p className="text-zinc-400">— {testimonial.author}</p>
        </div>
      ))}
    </div>
  );
}