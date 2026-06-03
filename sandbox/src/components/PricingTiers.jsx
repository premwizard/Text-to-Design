import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function PricingTiers() {
  const pricingPlans = [
    {
      name: 'Starter',
      price: '$0',
      period: '/month',
      description: 'Perfect for exploring your creative potential.',
      features: [
        '10 monthly generations',
        'Standard image quality',
        'Access to basic styles',
        'Community support',
        'Public gallery uploads'
      ],
      buttonText: 'Get Started',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'Unlock advanced features for serious creators.',
      features: [
        'Unlimited generations',
        'High-resolution output',
        'Exclusive artistic styles',
        'Priority email support',
        'Private gallery options',
        'Commercial usage rights'
      ],
      buttonText: 'Upgrade Now',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large teams and agencies.',
      features: [
        'Dedicated account manager',
        'Custom AI model training',
        'API access & integrations',
        'Advanced security & compliance',
        'Volume licensing',
        '24/7 Premium support'
      ],
      buttonText: 'Contact Sales',
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4 font-space-grotesk">Flexible Plans for Every Creator</h2>
        <p className="text-lg text-gray-300 font-inter max-w-3xl mx-auto">Choose the perfect SynthAI plan that fits your creative needs, from free exploration to professional-grade tools.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative backdrop-blur-lg bg-white/10 border ${plan.highlight ? 'border-blue-500' : 'border-white/20'} rounded-xl p-8 flex flex-col shadow-lg transition-all duration-300 ${plan.highlight ? 'scale-105 shadow-blue-500/30' : 'hover:scale-[1.02]'}`}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase rounded-full tracking-wider shadow-md flex items-center">
                <Sparkles className="w-4 h-4 mr-1" /> Popular
              </div>
            )}
            <h3 className="text-3xl font-bold text-gray-50 mb-2 font-space-grotesk">{plan.name}</h3>
            <p className="text-gray-300 mb-6 font-inter">{plan.description}</p>

            <div className="mb-8">
              <span className="text-5xl font-bold text-gray-50 font-space-grotesk">{plan.price}</span>
              <span className="text-xl text-gray-400 font-inter">{plan.period}</span>
            </div>

            <ul className="flex-grow space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-200 font-inter">
                  <Check className="text-blue-500 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 cursor-pointer ${plan.highlight ? 'bg-blue-500 text-white hover:opacity-90' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}