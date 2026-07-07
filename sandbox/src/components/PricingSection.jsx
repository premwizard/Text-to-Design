import React from 'react';
import { motion } from 'framer-motion';


function PricingSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-indigo-500 mb-4">
          Pricing Plans
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Choose a plan that suits your needs and budget.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded shadow-md p-4"
          >
            <h3 className="text-lg font-bold text-gray-600 mb-2">
              Basic
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-2">
              $9.99/month
            </p>
            <ul className="list-disc ml-4">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
            <button className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded shadow-md p-4"
          >
            <h3 className="text-lg font-bold text-gray-600 mb-2">
              Premium
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-2">
              $19.99/month
            </p>
            <ul className="list-disc ml-4">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
            </ul>
            <button className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;