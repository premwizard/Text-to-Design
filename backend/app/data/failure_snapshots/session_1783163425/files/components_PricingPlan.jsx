import React from 'react';
import { Check } from 'lucide-react';

const PricingPlan = ({ name, price, frequency, features, isPopular }) => {
  const buttonClasses = isPopular
    ? "bg-gradient-to-r from-zinc-700 to-zinc-900 text-white hover:from-zinc-800 hover:to-zinc-900"
    : "bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400";

  return (
    <div
      className={`relative p-8 rounded-md flex flex-col justify-between h-full transition-all duration-300 ease-in-out
        ${isPopular ? 'bg-zinc-50 border-2 border-zinc-700' : 'bg-white border border-zinc-200 hover:border-zinc-300'}`}
    >
      {isPopular && (
        <span className="absolute top-0 right-0 -mt-3 -mr-3 px-4 py-1 bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider rounded-md">
          Most Popular
        </span>
      )}
      <div>
        <h3 className="text-3xl font-bold mb-4 text-zinc-900">{name}</h3>
        <p className="text-5xl font-extrabold text-zinc-900 mb-2">
          {price === 'Contact Us' ? (
            'Custom'
          ) : (
            `$${price}`
          )}
        </p>
        {frequency && (
          <p className="text-zinc-600 text-lg mb-8">
            {price === 'Contact Us' ? '' : `/ ${frequency}`}
          </p>
        )}

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-zinc-700">
              <Check size={20} className="text-zinc-700 mr-3 flex-shrink-0 mt-1" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`w-full py-3 font-semibold rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 ${buttonClasses}`}
      >
        {isPopular ? 'Get Started' : 'Choose Plan'}
      </button>
    </div>
  );
};

export default PricingPlan;