import React from 'react';
import lucide from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';

function TestimonialsSection() {
  const testimonial1 = {
    name: "John Doe",
    text: "I've been using Showcase Your Art for years and it's been a game-changer for my art career.",
    image: "https://images.unsplash.com/photo-1523204548574-9f5a7d1f9f8d",
  };

  const testimonial2 = {
    name: "Jane Doe",
    text: "Showcase Your Art has helped me discover new artists and styles that I never knew existed.",
    image: "https://images.unsplash.com/photo-1523204548574-9f5a7d1f9f8d",
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <h2 className="text-3xl font-bold mb-4">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Our Clients Say
          </motion.span>
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="bg-white p-8 shadow-md rounded-md w-full md:w-1/2">
            <div className="flex items-center mb-4">
              <img src={testimonial1.image} alt={testimonial1.name} className="w-12 h-12 rounded-full" />
              <h3 className="text-lg font-bold ml-2">{testimonial1.name}</h3>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              {testimonial1.text}
            </p>
            <lucide.Icon name="star" size={20} className="text-yellow-500" />
          </div>
          <div className="bg-white p-8 shadow-md rounded-md w-full md:w-1/2">
            <div className="flex items-center mb-4">
              <img src={testimonial2.image} alt={testimonial2.name} className="w-12 h-12 rounded-full" />
              <h3 className="text-lg font-bold ml-2">{testimonial2.name}</h3>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              {testimonial2.text}
            </p>
            <lucide.Icon name="star" size={20} className="text-yellow-500" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;