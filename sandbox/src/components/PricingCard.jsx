import React from 'react';
import { motion } from 'framer-motion';

const PricingCard = ({ name, price, period, features, highlight, icon: Icon }) => {
  return (
    <motion.div
      className={`p-8 rounded-xl shadow-lg border ${highlight ? 'border-purple-500 bg-purple-50 scale-105' : 'bg-white border-gray-200'} flex flex-col justify-between`}
      whileHover={{ y: highlight ? 0 : -10, scale: highlight ? 1.02 : 1.03, boxShadow: highlight ? '0px 20px 40px rgba(124, 41, 185, 0.3)' : '0px 15px 30px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-2xl font-bold font-heading ${highlight ? 'text-purple-600' : 'text-gray-900'}`}>
            {name}
          </h3>
          {highlight && (
            <span className="bg-purple-200 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">
              Most Popular
            </span>
          )}
        </div>
        <div className="mb-6">
          <span className={`text-5xl font-extrabold ${highlight ? 'text-purple-600' : 'text-blue-600'}`}>
            {price}
          </span>
          <span className="text-gray-500 font-medium">/{period}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <Icon className={`w-5 h-5 mr-3 ${highlight ? 'text-purple-500' : 'text-blue-500'}`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`w-full py-3 rounded-lg font-bold text-lg transition duration-300 ${highlight
          ? 'bg-purple-600 text-white hover:bg-purple-700'
          : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Choose Plan
      </button>
    </motion.div>
  );
};

export default PricingCard;