import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "SynapseFlow has revolutionized our internal processes. We've seen a 40% increase in efficiency and our team couldn't be happier with the streamlined workflows.",
    author: "Sarah Chen",
    title: "Operations Director, Tech Solutions Inc.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote: "The integration capabilities of SynapseFlow are simply outstanding. It connects effortlessly with all our existing tools, creating a truly unified platform.",
    author: "David Lee",
    title: "CTO, Global Innovations",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "Our data analytics have never been clearer. SynapseFlow's dashboards provide actionable insights that drive our strategic decisions forward.",
    author: "Maria Garcia",
    title: "Data Analyst Lead, Creative Minds Agency",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "From implementation to ongoing support, SynapseFlow has exceeded our expectations. A truly robust and reliable automation partner.",
    author: "John Smith",
    title: "CEO, Enterprise Solutions",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-white to-zinc-50">
      <div className="container mx-auto px-4 max-w-4xl text-center relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-zinc-900">
          What Our Clients Say
        </h2>
        <p className="text-xl text-zinc-700 mb-12 max-w-2xl mx-auto">
          Hear directly from businesses that have transformed their operations with SynapseFlow.
        </p>

        <div className="relative bg-white p-8 md:p-12 rounded-md border border-zinc-200 shadow-sm transition-all duration-500 ease-in-out">
          <p className="text-xl md:text-2xl font-medium text-zinc-800 mb-8 italic leading-relaxed">
            "{testimonials[currentIndex].quote}"
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <img
              src={testimonials[currentIndex].avatar}
              alt={testimonials[currentIndex].author}
              className="w-16 h-16 rounded-full object-cover border-2 border-zinc-200"
            />
            <div className="text-center sm:text-left">
              <p className="font-semibold text-lg text-zinc-900">{testimonials[currentIndex].author}</p>
              <p className="text-zinc-600 text-sm">{testimonials[currentIndex].title}</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-16 p-3 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-16 p-3 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                idx === currentIndex ? 'bg-zinc-700' : 'bg-zinc-300 hover:bg-zinc-400'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;