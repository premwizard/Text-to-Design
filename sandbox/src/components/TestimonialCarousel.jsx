import React, { useState } from 'react';

function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      quote: 'TechPulse has been a game-changer for our business.',
      author: 'John Doe, CEO of Example Inc.',
    },
    {
      quote: 'The team at TechPulse is knowledgeable and responsive.',
      author: 'Jane Smith, Marketing Manager at Example Corp.',
    },
    {
      quote: 'We\'ve seen a significant increase in sales since partnering with TechPulse.',
      author: 'Bob Johnson, Sales Director at Example Ltd.',
    },
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-white py-12 md:py-20 lg:py-28">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-zinc-900 mb-4 md:mb-6 lg:mb-8">
          What Our Clients Say
        </h2>
        <div className="flex flex-col items-center justify-center">
          <blockquote className="text-lg md:text-xl lg:text-2xl text-zinc-600 mb-4 md:mb-6 lg:mb-8">
            {testimonials[activeIndex].quote}
          </blockquote>
          <p className="text-lg md:text-xl lg:text-2xl text-zinc-600 text-center">
            {testimonials[activeIndex].author}
          </p>
        </div>
        <div className="flex justify-center space-x-4 md:space-x-6 lg:space-x-8">
          <button
            className="bg-zinc-900 text-zinc-100 py-2 md:py-4 lg:py-6 px-4 md:px-8 lg:px-12 rounded-md hover:bg-zinc-800 transition duration-200"
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            className="bg-zinc-900 text-zinc-100 py-2 md:py-4 lg:py-6 px-4 md:px-8 lg:px-12 rounded-md hover:bg-zinc-800 transition duration-200"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialCarousel;