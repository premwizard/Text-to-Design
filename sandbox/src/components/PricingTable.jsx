import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

function PricingTable() {
  const plans = [
    {
      title: "Basic",
      price: 9.99,
      features: ["Feature 1", "Feature 2"],
    },
    {
      title: "Pro",
      price: 19.99,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      title: "Enterprise",
      price: 49.99,
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-12">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        Pricing
      </h2>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white shadow-sm p-4 rounded glassmorphism"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {plan.title}
            </h3>
            <p className="text-lg text-slate-900 mb-4">
              ${plan.price}/month
            </p>
            <ul className="list-none">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 mb-2"
                >
                  <DollarSign className="text-indigo-500" />
                  <span className="text-lg text-slate-900">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4">
              Get Started
            </button>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default PricingTable;