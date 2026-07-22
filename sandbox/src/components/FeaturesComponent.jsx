import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

function FeaturesComponent() {
  const features = [
    {
      title: "Feature 1",
      description: "This is the first feature.",
    },
    {
      title: "Feature 2",
      description: "This is the second feature.",
    },
    {
      title: "Feature 3",
      description: "This is the third feature.",
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
          Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white shadow-sm p-8 rounded"
            >
              <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
              <p className="text-lg text-slate-900 mt-4">{feature.description}</p>
              <ul className="list-none mt-4">
                <li className="flex items-center space-x-2">
                  <Check className="text-indigo-500" />
                  <span className="text-lg text-slate-900">Feature 1</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-indigo-500" />
                  <span className="text-lg text-slate-900">Feature 2</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-indigo-500" />
                  <span className="text-lg text-slate-900">Feature 3</span>
                </li>
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesComponent;