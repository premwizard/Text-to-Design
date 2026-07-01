import React, { useState } from 'react';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Basic',
    monthlyPrice: 29,
    annualPrice: 299,
    features: [
      '5 Automated Workflows',
      'Basic Analytics Dashboard',
      'Email Support',
      'Up to 3 Users',
      'Standard Integrations',
    ],
    buttonText: 'Start Free Trial',
  },
  {
    name: 'Pro',
    monthlyPrice: 79,
    annualPrice: 799,
    features: [
      'Unlimited Workflows',
      'Advanced Analytics & Reporting',
      'Priority Email & Chat Support',
      'Up to 10 Users',
      'Premium Integrations',
      'Smart Recommendations',
    ],
    buttonText: 'Get Started',
    isPrimary: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    features: [
      'All Pro Features',
      'Dedicated Account Manager',
      'Custom Integrations',
      'On-Premise Deployment Option',
      'SLA & Uptime Guarantees',
      '24/7 Phone Support',
    ],
    buttonText: 'Contact Sales',
  },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-white text-zinc-900 py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Flexible Plans for Every Need
          </h2>
          <p className="text-lg text-zinc-700 max-w-2xl mx-auto">
            Choose the perfect plan that scales with your business, from startups to large enterprises.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-zinc-100 rounded-md p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
                !isAnnual ? 'bg-zinc-600 text-white' : 'text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
                isAnnual ? 'bg-zinc-600 text-white' : 'text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Annually <span className="text-zinc-200 text-sm ml-1">(Save 15%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col p-8 rounded-md ${
                plan.isPrimary ? 'bg-zinc-900 text-white shadow-xl' : 'bg-zinc-50 text-zinc-900'
              } transition-all duration-300 transform hover:-translate-y-1`}
            >
              <h3 className={`text-2xl font-bold mb-4 ${plan.isPrimary ? 'text-white' : 'text-zinc-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-zinc-400 mb-6 ${plan.isPrimary ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {plan.name === 'Basic' && 'Ideal for small teams getting started'}
                {plan.name === 'Pro' && 'Perfect for growing teams and advanced needs'}
                {plan.name === 'Enterprise' && 'Tailored solutions for large organizations'}
              </p>

              <div className="mb-8">
                {plan.monthlyPrice === 'Custom' ? (
                  <span className={`text-4xl font-bold ${plan.isPrimary ? 'text-white' : 'text-zinc-900'}`}>
                    Custom
                  </span>
                ) : (
                  <>
                    <span className={`text-5xl font-bold ${plan.isPrimary ? 'text-white' : 'text-zinc-900'}`}>
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className={`text-xl font-medium ${plan.isPrimary ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {isAnnual ? '/year' : '/month'}
                    </span>
                  </>
                )}
              </div>

              <ul className="mb-10 space-y-3 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <Check size={20} className={`mr-3 ${plan.isPrimary ? 'text-zinc-400' : 'text-zinc-600'}`} />
                    <span className={`${plan.isPrimary ? 'text-zinc-200' : 'text-zinc-700'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-md font-semibold transition-colors duration-300 ${
                  plan.isPrimary
                    ? 'bg-zinc-600 text-white hover:bg-zinc-700'
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;