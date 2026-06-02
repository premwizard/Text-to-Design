import React from 'react';
import { Check, Star } from 'lucide-react';

export default function PricingTiers() {
  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      frequency: '/month',
      description: 'Ideal for individuals and small projects getting started with AI generation.',
      features: [
        '10,000 Generation Credits',
        'Standard AI Models',
        'Basic Image Generation',
        'Email Support',
        'Community Access'
      ],
      isPopular: false,
    },
    {
      name: 'Pro',
      price: '$79',
      frequency: '/month',
      description: 'Perfect for professionals and growing teams needing advanced capabilities.',
      features: [
        '50,000 Generation Credits',
        'Advanced AI Models',
        'High-Res Image Generation',
        'Priority Email & Chat Support',
        'Multi-Modal Generation',
        'API Access'
      ],
      isPopular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      frequency: '',
      description: 'Tailored solutions for large organizations with specific needs and high volume.',
      features: [
        'Unlimited Generation Credits',
        'Custom AI Models',
        'Dedicated Account Manager',
        '24/7 Premium Support',
        'On-Premise Deployment Options',
        'Advanced Analytics & Reporting'
      ],
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-zinc-900 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-50 mb-6">
          Flexible Plans for Every Creator
        </h2>
        <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-16">
          Choose the plan that best fits your creative workflow and scale your generative AI capabilities with CognitoFlow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-zinc-800 bg-opacity-40 border border-zinc-700/60 rounded-3xl p-8 shadow-xl backdrop-blur-lg flex flex-col justify-between transform hover:scale-[1.02] transition-all duration-300
                ${plan.isPopular ? 'ring-2 ring-blue-400' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center">
                  <Star size={14} className="mr-1" /> Most Popular
                </div>
              )}
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-50 mb-3">{plan.name}</h3>
                <p className="text-gray-300 mb-6 text-base">{plan.description}</p>
                <div className="text-gray-50 mb-8">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className="text-xl font-medium">{plan.frequency}</span>
                </div>
              </div>

              <ul className="space-y-4 text-gray-200 flex-grow mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check size={20} className="text-blue-400 mr-3 flex-shrink-0" />
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`mt-auto w-full px-7 py-4 rounded-full text-lg font-semibold shadow-lg hover:opacity-90 transition-all duration-200 cursor-pointer
                ${plan.isPopular ? 'bg-blue-400 text-white' : 'bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'}`}>
                {plan.price === 'Custom' ? 'Contact Us' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}