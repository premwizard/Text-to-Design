import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This is a great product!",
      author: "John Doe",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b11d35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdfMXx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
    },
    {
      quote: "I love this product!",
      author: "Jane Doe",
      image: "https://images.unsplash.com/photo-1519345182561-3f588066b1f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdfMXx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-12">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        Testimonials
      </h2>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-sm p-4 rounded glassmorphism"
          >
            <Quote className="text-indigo-500 mb-2" />
            <p className="text-lg text-slate-900 mb-4">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center space-x-2">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full"
              />
              <span className="text-lg text-slate-900">
                {testimonial.author}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default TestimonialsSection;