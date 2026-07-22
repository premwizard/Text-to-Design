import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This is a great product!",
      author: "John Doe",
    },
    {
      quote: "I love this product!",
      author: "Jane Doe",
    },
    {
      quote: "This product is amazing!",
      author: "Bob Smith",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto p-12 md:p-24">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold text-slate-900"
        >
          Testimonials
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white shadow-sm p-8 rounded"
            >
              <Quote className="text-indigo-500 text-lg" />
              <p className="text-lg text-slate-900 mt-4">{testimonial.quote}</p>
              <p className="text-lg text-slate-900 mt-4">{testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;