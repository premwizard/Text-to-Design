import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const pricingPlans = [
    {
      name: 'Basic',
      price: '$29',
      period: 'per month',
      features: ['1 Project', '5 Users', 'Basic Support'],
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$79',
      period: 'per month',
      features: ['Unlimited Projects', '15 Users', 'Priority Support', 'Advanced Analytics'],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      features: ['Unlimited Projects', 'Unlimited Users', 'Dedicated Support', 'Custom Integrations'],
      highlight: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-extrabold text-slate-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Flexible Pricing Plans
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the plan that best fits your business needs. No hidden fees, just value.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-8 text-center border ${plan.highlight ? 'border-indigo-500 shadow-xl scale-105' : 'border-gray-200'} transition duration-300 ease-in-out`}
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className={`text-3xl font-bold mb-4 ${plan.highlight ? 'text-indigo-600' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className={`text-5xl font-extrabold ${plan.highlight ? 'text-indigo-600' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
                <span className="text-slate-500 font-medium ml-1">{plan.period}</span>
              </div>
              <ul className="text-left mb-8 space-y-3 text-slate-700">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <Check className={`h-5 w-5 mr-3 ${plan.highlight ? 'text-indigo-500' : 'text-teal-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition duration-300 ease-in-out ${plan.highlight
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                  : 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500'
                }`}
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;