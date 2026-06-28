import React, { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'lucide-react';
import testimonialData from './testimonialData';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialInterval, setTestimonialInterval] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-zinc-600 rounded-md p-8 lg:p-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-zinc-400">What Our Customers Say</h2>
        <div className="flex items-center space-x-4">
          <button className="rounded-full bg-zinc-700 p-2" onClick={handlePrevSlide}>
            <AiOutlineArrowLeft className="text-zinc-400" />
          </button>
          <button className="rounded-full bg-zinc-700 p-2" onClick={handleNextSlide}>
            <AiOutlineArrowRight className="text-zinc-400" />
          </button>
        </div>
      </div>
      <div className="flex overflow-hidden">
        {testimonialData.map((testimonial, index) => (
          <div
            key={index}
            className={`w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 transition duration-300 transform ${
              index === currentIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          >
            <p className="text-xl font-bold text-zinc-400">{testimonial.name}</p>
            <p className="text-lg text-zinc-400">{testimonial.testimonial}</p>
            <p className="text-lg text-zinc-400">{testimonial.company}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;

const testimonialData = [
  {
    name: 'John Doe',
    testimonial:
      'DashSphere has revolutionized the way we visualize and understand our data. The tool is incredibly intuitive and has saved us so much time.',
    company: 'ABC Inc.',
  },
  {
    name: 'Jane Doe',
    testimonial:
      'The insights we've gained from using DashSphere have been invaluable. We've been able to make data-driven decisions that have positively impacted our business.',
    company: 'DEF Corp.',
  },
  {
    name: 'Bob Smith',
    testimonial:
      'I was blown away by the ease of use and the level of customization available in DashSphere. It's truly a game-changer for data visualization.',
    company: 'GHI Ltd.',
  },
];