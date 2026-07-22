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
    <section className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-12">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        Features
      </h2>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-sm p-4 rounded glassmorphism"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-lg text-slate-900">
              {feature.description}
            </p>
            <ul className="list-none mt-4">
              <li className="flex items-center space-x-2">
                <Check className="text-indigo-500" />
                <span className="text-lg text-slate-900">
                  Feature description
                </span>
              </li>
            </ul>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default FeaturesComponent;