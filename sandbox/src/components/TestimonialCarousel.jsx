import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      text: 'TechForge has been instrumental in helping us to innovate and grow our business.',
      author: 'John Doe, CEO of ABC Corporation',
    },
    {
      text: 'Their cutting-edge technology solutions have been a game-changer for our company.',
      author: 'Jane Smith, CTO of DEF Corporation',
    },
    {
      text: 'We have seen a significant increase in our revenue since we started working with TechForge.',
      author: 'Bob Johnson, CEO of GHI Corporation',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonial((prevTestimonial) => (prevTestimonial + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  const handlePreviousTestimonial = () => {
    setCurrentTestimonial((prevTestimonial) => (prevTestimonial - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prevTestimonial) => (prevTestimonial + 1) % testimonials.length);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 flex flex-col items-center space-y-4 md:space-y-6 lg:space-y-8">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-900">
        What Our Clients Say
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-zinc-100 rounded-md md:rounded-lg lg:rounded-xl p-4 md:p-6 lg:p-8 w-full md:w-1/2 lg:w-1/3"
      >
        <p className="text-lg md:text-xl lg:text-2xl text-zinc-600">
          {testimonials[currentTestimonial].text}
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-zinc-600">
          - {testimonials[currentTestimonial].author}
        </p>
      </motion.div>
      <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
        <button
          onClick={handlePreviousTestimonial}
          className="bg-zinc-100 text-zinc-900 py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 rounded-md md:rounded-lg lg:rounded-xl hover:bg-zinc-200 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Previous</span>
        </button>
        <button
          onClick={handleNextTestimonial}
          className="bg-zinc-100 text-zinc-900 py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 rounded-md md:rounded-lg lg:rounded-xl hover:bg-zinc-200 flex items-center space-x-2"
        >
          <span>Next</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default TestimonialCarousel;