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
      title: "Premium",
      price: 19.99,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      title: "Enterprise",
      price: 29.99,
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
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
          Pricing
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white shadow-sm p-8 rounded"
            >
              <h3 className="text-lg font-bold text-slate-900">{plan.title}</h3>
              <p className="text-lg text-slate-900 mt-4">
                <DollarSign className="text-indigo-500" />
                {plan.price}/month
              </p>
              <ul className="list-none mt-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="text-indigo-500" />
                    <span className="text-lg text-slate-900">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingTable;