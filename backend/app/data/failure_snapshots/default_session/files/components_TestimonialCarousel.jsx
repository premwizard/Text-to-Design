import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'lucide-react';

function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      quote: 'TechSphere has been instrumental in helping us scale our business.',
      author: 'John Doe, CEO of XYZ Corporation',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    },
    {
      quote: 'Their expertise and guidance have been invaluable to our company.',
      author: 'Jane Smith, Founder of ABC Startup',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    },
    {
      quote: 'We\'ve seen significant improvements in our operations since partnering with TechSphere.',
      author: 'Bob Johnson, COO of DEF Company',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      {/* Hero Section */}
      <div className="flex flex-wrap justify-center mb-12">
        <div className="w-full lg:w-1/2 xl:w-1/2 p-6">
          <h1 className="text-3xl text-zinc-900 font-bold mb-4">Unlock Your Business Potential</h1>
          <p className="text-lg text-zinc-600 mb-6">Discover how TechSphere can help you scale your business and achieve your goals.</p>
          <a href="#" className="bg-zinc-800 py-2 px-4 rounded-md hover:bg-zinc-700 transition duration-300">Get Started</a>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/2 p-6">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Hero Image" className="w-full h-full object-cover object-center rounded-md" />
        </div>
      </div>

      {/* Testimonial Carousel Section */}
      <div className="flex flex-wrap justify-center mb-12">
        <div className="w-full lg:w-1/2 xl:w-1/2 p-6">
          <div className="glassmorphism p-6 rounded-md">
            <p className="text-lg text-zinc-600">{testimonials[activeIndex].quote}</p>
            <div className="flex items-center mt-4">
              <img src={testimonials[activeIndex].image} alt="Author Image" className="w-12 h-12 object-cover object-center rounded-full" />
              <span className="text-lg text-zinc-900 ml-4">{testimonials[activeIndex].author}</span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/2 p-6 flex justify-between">
          <button className="bg-zinc-800 py-2 px-4 rounded-md hover:bg-zinc-700 transition duration-300" onClick={handlePrev}>
            <FiArrowLeft size={16} />
          </button>
          <button className="bg-zinc-800 py-2 px-4 rounded-md hover:bg-zinc-700 transition duration-300" onClick={handleNext}>
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-wrap justify-center mb-12">
        <div className="w-full lg:w-1/3 xl:w-1/3 p-6">
          <h2 className="text-2xl text-zinc-900 font-bold mb-4">Feature 1</h2>
          <p className="text-lg text-zinc-600 mb-6">Description of feature 1.</p>
        </div>
        <div className="w-full lg:w-1/3 xl:w-1/3 p-6">
          <h2 className="text-2xl text-zinc-900 font-bold mb-4">Feature 2</h2>
          <p className="text-lg text-zinc-600 mb-6">Description of feature 2.</p>
        </div>
        <div className="w-full lg:w-1/3 xl:w-1/3 p-6">
          <h2 className="text-2xl text-zinc-900 font-bold mb-4">Feature 3</h2>
          <p className="text-lg text-zinc-600 mb-6">Description of feature 3.</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-wrap justify-center bg-zinc-800 p-6 text-zinc-400">
        <div className="w-full lg:w-1/2 xl:w-1/2 p-6">
          <h2 className="text-2xl text-zinc-400 font-bold mb-4">About Us</h2>
          <p className="text-lg text-zinc-400 mb-6">TechSphere is a leading provider of business solutions.</p>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/2 p-6">
          <h2 className="text-2xl text-zinc-400 font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-zinc-400 mb-6">Email: <a href="mailto:info@techsphere.com" className="text-zinc-400 hover:text-zinc-300 transition duration-300">info@techsphere.com</a></p>
          <p className="text-lg text-zinc-400 mb-6">Phone: <a href="tel:1234567890" className="text-zinc-400 hover:text-zinc-300 transition duration-300">123-456-7890</a></p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCarousel;