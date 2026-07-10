import React from 'react';
import PricingCard from './PricingCard';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: 'month',
      features: [
        '1 Project Limit',
        'Basic Collaboration Tools',
        'Standard Support',
        '5 GB Storage',
      ],
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$79',
      period: 'month',
      features: [
        'Unlimited Projects',
        'Advanced Collaboration',
        'Priority Support',
        '50 GB Storage',
        'API Access',
      ],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'month',
      features: [
        'Unlimited Projects',
        'Dedicated Account Manager',
        '24/7 Premium Support',
        '1 TB Storage',
        'Custom Integrations',
      ],
      highlight: false,
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">
            Flexible Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your needs and budget. Scale as you grow.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              highlight={plan.highlight}
              icon={Check}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;