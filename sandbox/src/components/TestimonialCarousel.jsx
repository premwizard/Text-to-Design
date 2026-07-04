import React, { useState, useEffect } from 'react';

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'John Doe',
    },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Jane Doe',
    },
    {
      id: 3,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Bob Smith',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <div className="py-12 md:px-12 px-4 md:mx-auto lg:mx-auto xl:mx-auto">
      <div className="container mx-auto p-4 md:p-6 lg:p-12 bg-white rounded-md shadow-md">
        <h2 className="text-4xl font-bold text-zinc-900 mb-8 md:mb-12 lg:mb-16" aria-label="Testimonials Section">
          What our customers say
        </h2>
        <div className="flex flex-col items-center">
          <p className="text-lg text-zinc-900 mb-8 md:mb-12 lg:mb-16" aria-label={testimonials[currentIndex].text}>
            {testimonials[currentIndex].text}
          </p>
          <span className="text-lg text-zinc-900" aria-label={`Testimonial by ${testimonials[currentIndex].author}`}>{`- ${testimonials[currentIndex].author}`}</span>
        </div>
        <div className="flex justify-center mt-8 md:mt-12 lg:mt-16">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              className={`mx-2 md:mx-4 lg:mx-6 w-2 h-2 bg-zinc-100 rounded-full ${
                index === currentIndex ? 'bg-zinc-900' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1} of ${testimonials.length}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialCarousel;