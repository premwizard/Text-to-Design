import React from 'react';

export default function PricingTable() {
  const plans = [
    {
      name: 'Basic',
      price: '$19',
      features: ['Up to 10 Projects',
                 '5 Team Members',
                 'Basic Analytics',
                 'Email Support'],
      isRecommended: false,
    },
    {
      name: 'Pro',
      price: '$49',
      features: ['Unlimited Projects',
                 'Unlimited Team Members',
                 'Advanced Analytics',
                 'Priority Email Support',
                 '24/7 Chat Support'],
      isRecommended: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Dedicated Account Manager',
                 'Custom Integrations',
                 'White-labeling Options',
                 'All Pro Features'],
      isRecommended: false,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-300">Flexible Plans for Every Need</h2>
          <p className="text-lg md:text-xl text-gray-400">Choose the plan that best fits your team's size and requirements.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`p-8 rounded-lg shadow-lg border ${plan.isRecommended ? 'border-gray-300 bg-neutral-850' : 'border-neutral-800 bg-neutral-900'} relative transition-all duration-300 hover:shadow-2xl hover:scale-105 ${index === 1 ? 'scale-105 shadow-xl border-gray-300' : ''}`}
            >
              {plan.isRecommended && (
                <span className="absolute top-0 right-0 bg-gray-300 text-neutral-950 text-xs font-bold px-3 py-1 rounded-bl-lg">Recommended</span>
              )}
              <h3 className="text-3xl font-bold mb-2 text-gray-300">{plan.name}</h3>
              <p className="text-lg mb-6 text-gray-400">{plan.price === 'Custom' ? 'Contact us' : `${plan.price}/month`}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${plan.isRecommended ? 'bg-gray-300 text-neutral-950 hover:bg-gray-400' : 'border border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-neutral-950'}`}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}