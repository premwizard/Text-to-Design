import React from 'react';

function PricingPlan() {
  const [selectedPlan, setSelectedPlan] = React.useState('monthly');

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const plans = {
    monthly: {
      title: 'Basic Monthly',
      price: '$29.99/month',
      features: [
        '100 transactions/month',
        '1GB cloud storage',
        'Basic analytics reports',
        'Email support',
      ],
    },
    yearly: {
      title: 'Premium Yearly',
      price: '$299.99/year',
      features: [
        'Unlimited transactions',
        '10GB cloud storage',
        'Advanced analytics & insights',
        'Priority email & chat support',
        'Customizable dashboards',
      ],
    },
  };

  const currentPlan = plans[selectedPlan];

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center text-slate-900 mb-10 md:mb-12 lg:mb-16 leading-tight">
        Flexible <span className="text-blue-600">Pricing Plans</span>
      </h2>
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="flex bg-slate-100 rounded-lg p-1 shadow-inner">
          <button
            className={`py-2 px-6 rounded-md text-lg font-medium transition-all duration-300 ${
              selectedPlan === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => setSelectedPlan('monthly')}
          >
            Monthly
          </button>
          <button
            className={`py-2 px-6 rounded-md text-lg font-medium transition-all duration-300 ${
              selectedPlan === 'yearly' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => setSelectedPlan('yearly')}
          >
            Yearly
          </button>
        </div>

        <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 p-8 md:p-10 text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-snug">
            {currentPlan.title}
          </h3>
          <p className="text-5xl font-extrabold text-blue-600 mb-6">
            {currentPlan.price}
          </p>
          <ul className="space-y-3 text-slate-700 text-lg mb-8">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xl">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default PricingPlan;