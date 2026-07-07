import React from 'react';
import { motion } from 'framer-motion';
import { Quotes } from 'lucide-react';

function TestimonialCarousel() {
  const testimonials = [
    {
      id: 1,
      text: 'TechSphere has been a game-changer for our business. Their expertise and support have helped us grow our online presence and reach new customers.',
      author: 'John Doe, CEO of Example Inc.',
    },
    {
      id: 2,
      text: 'I was blown away by the level of service and attention to detail provided by TechSphere. They truly understand the needs of their clients and deliver high-quality results.',
      author: 'Jane Smith, Marketing Manager at Example Corp.',
    },
    {
      id: 3,
      text: 'TechSphere has been an invaluable partner for our company. Their knowledge and expertise have helped us navigate the ever-changing landscape of digital marketing.',
      author: 'Bob Johnson, Founder of Example LLC.',
    },
  ];

  return (
    <div className="carousel">
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="carousel-item"
        >
          <Quotes size={24} className="text-zinc-900" />
          <p className="text-lg text-zinc-600">{testimonial.text}</p>
          <p className="text-lg text-zinc-900">{testimonial.author}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default TestimonialCarousel;