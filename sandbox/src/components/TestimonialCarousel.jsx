import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function TestimonialCarousel() {
  const [testimonials] = useState([
    {
      id: 1,
      text: 'TechPulse has been instrumental in helping us make data-driven decisions. Their platform is intuitive and powerful!',
      author: 'John Doe, CEO of InnovateCorp',
    },
    {
      id: 2,
      text: 'The insights provided by TechPulse have been invaluable to our business. We\'ve seen a significant improvement in efficiency.',
      author: 'Jane Smith, Marketing Director at GrowthHub',
    },
    {
      id: 3,
      text: 'TechPulse has helped us streamline our operations and improve efficiency. The support team is also fantastic!',
      author: 'Bob Johnson, Operations Manager at Streamline Solutions',
    },
    {
      id: 4,
      text: 'A truly transformative tool! TechPulse provides clarity where there was once complexity. Highly recommended.',
      author: 'Alice Brown, Product Lead at Visionary Inc.',
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000); // Increased interval for better readability

    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-blue-600 py-16 md:py-24 lg:py-32 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-12 md:mb-16 lg:mb-20 leading-tight">
          What Our <span className="text-blue-200">Clients Say</span>
        </h2>
        <div className="relative max-w-3xl mx-auto bg-blue-700 rounded-xl shadow-2xl p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center min-h-[250px] md:min-h-[300px]">
          <blockquote className="text-lg md:text-xl lg:text-2xl italic leading-relaxed mb-6 md:mb-8">
            "{testimonials[activeIndex].text}"
          </blockquote>
          <p className="text-blue-200 font-semibold text-base md:text-lg lg:text-xl">
            - {testimonials[activeIndex].author}
          </p>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 md:mt-10 lg:mt-12 space-x-3">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-blue-200 w-4 h-4' : 'bg-blue-400 opacity-50'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialCarousel;