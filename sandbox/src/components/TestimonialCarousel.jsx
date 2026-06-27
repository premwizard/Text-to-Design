import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'lucide-react';
import Carousel from 'react-carousel';

const slides = [
  {
    title: 'NexaTech is a great company!',
    text: 'I was amazed by their knowledge and expertise.',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Best customer service ever!',
    text: 'Their support team is always available and helpful.',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'NexaTech is a game-changer!',
    text: 'Their innovative solutions have helped me grow my business.',
    image: 'https://via.placeholder.com/150',
  },
];

const TestimonialCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevClick = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const handleNextClick = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  return (
    <div className="h-screen overflow-hidden lg:h-screen lg:overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">What Our Clients Say</h2>
        </div>
        <Carousel
          infinite
          slides={slides}
          activeSlide={activeSlide}
          onChange={setActiveSlide}
          className="max-w-7xl mx-auto"
        >
          {slides.map((slide, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-8 lg:p-12 rounded-xl shadow-lg">
              <img src={slide.image} alt={slide.title} className="w-10 h-10 rounded-full object-cover" />
              <p className="text-lg text-white mt-4">{slide.text}</p>
              <h3 className="text-2xl font-bold text-indigo-600 mt-4">{slide.title}</h3>
            </div>
          ))}
        </Carousel>
        <button
          className="inline-flex items-center justify-center p-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white"
          onClick={handlePrevClick}
        >
          <AiOutlineLeft className="mr-2" size={24} />
          Previous
        </button>
        <button
          className="inline-flex items-center justify-center p-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white ml-4"
          onClick={handleNextClick}
        >
          Next
          <AiOutlineRight className="ml-2" size={24} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;