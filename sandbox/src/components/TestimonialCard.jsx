import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ quote, name, title, image }) => {
  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
      whileHover={{ y: -10, scale: 1.02, boxShadow: '0px 15px 30px rgba(0,0,0,0.1)' }}
    >
      <Quote className="text-blue-600 mb-4" size={48} />
      <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
        "{quote}"
      </p>
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-200"
      />
      <h3 className="text-xl font-bold font-heading text-gray-900">{name}</h3>
      <p className="text-gray-500">{title}</p>
    </motion.div>
  );
};

export default TestimonialCard;