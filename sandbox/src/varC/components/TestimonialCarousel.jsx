import React, { useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CEO, TechNova",
    quote: "Pixelcraft Collective transformed our online presence. Their attention to detail and creative solutions were outstanding. The design is not only beautiful but highly functional.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Marketing Director, Innovate Solutions",
    quote: "Working with Pixelcraft was a seamless experience. They understood our vision and delivered a product that exceeded expectations. Highly recommend their services!",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Product Lead, Future Corp",
    quote: "The team at Pixelcraft Collective is exceptionally talented. They provided strategic insights and executed the project with remarkable skill. Our user engagement has significantly increased.",
    rating: 4
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="container mx-auto px-6 py-16 lg:py-24 bg-neutral-50 rounded-lg">
      <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12">
        What Our Clients Say
      </h2>
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="bg-white p-8 lg:p-12 rounded-lg shadow-lg mb-8">
          <div className="flex justify-center mb-4">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-lg lg:text-xl italic text-neutral-700 mb-6 leading-relaxed">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </p>
          <p className="font-bold text-neutral-900">{currentTestimonial.name}</p>
          <p className="text-neutral-600">{currentTestimonial.role}</p>
        </div>
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none"
        >
          &lt;
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}