import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, color, bg }) => {
  return (
    <motion.div
      className={`p-8 rounded-xl shadow-lg transition duration-300 ease-in-out ${bg} flex flex-col items-center text-center`}
      whileHover={{ y: -10, scale: 1.03, boxShadow: '0px 15px 30px rgba(0,0,0,0.1)' }}
    >
      <div className={`rounded-full p-4 mb-6 ${bg} ${color} inline-flex items-center justify-center`}>
        <Icon size={36} />
      </div>
      <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;