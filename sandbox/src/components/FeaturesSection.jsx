import React from 'react';
import { motion } from 'framer-motion';
import featureIcons from '../assets/feature-icons.svg';
import backgroundPattern from '../assets/background-pattern.svg';

function FeaturesSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-indigo-500 mb-4">
          Key Features
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Our platform offers a range of features designed to help you succeed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded shadow-md p-4"
          >
            <img src={featureIcons} alt="Feature Icon" className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-bold text-gray-600 mb-2">
              Feature 1
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Description of feature 1
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded shadow-md p-4"
          >
            <img src={featureIcons} alt="Feature Icon" className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-bold text-gray-600 mb-2">
              Feature 2
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Description of feature 2
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded shadow-md p-4"
          >
            <img src={featureIcons} alt="Feature Icon" className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-bold text-gray-600 mb-2">
              Feature 3
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Description of feature 3
            </p>
          </motion.div>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto p-4 md:p-8 lg:p-12">
          <img src={backgroundPattern} alt="Background Pattern" className="w-full h-16" />
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;