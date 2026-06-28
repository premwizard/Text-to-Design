import React, { useState } from 'react';
import { CogIcon, PencilIcon, ArrowRightIcon } from 'lucide-react';

const PricingPlan = () => {
  const [tab, setTab] = useState('basic');
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Basic', price: 'Free' });
  const [features, setFeatures] = useState([
    { name: 'Feature 1', description: 'This is feature one' },
    { name: 'Feature 2', description: 'This is feature two' },
    { name: 'Feature 3', description: 'This is feature three' },
  ]);

  const handleTabChange = (tab) => {
    setTab(tab);
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handleFeatureToggle = (index) => {
    const newFeatures = [...features];
    newFeatures[index].expanded = !newFeatures[index].expanded;
    setFeatures(newFeatures);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-100">Choose a Plan</h2>
        <p className="text-lg text-gray-400">Select the best plan for your needs</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        <button
          className={`w-full md:w-48 lg:w-64 xl:w-72 py-4 px-6 text-lg font-bold text-zinc-400 bg-zinc-600 rounded-md hover:bg-zinc-700 transition duration-300 ease-in-out`}
          onClick={() => handleTabChange('basic')}
          style={{ borderColor: 'zinc-800', borderWidth: 1 }}
        >
          Basic
        </button>
        <button
          className={`w-full md:w-48 lg:w-64 xl:w-72 py-4 px-6 text-lg font-bold text-zinc-400 bg-zinc-600 rounded-md hover:bg-zinc-700 transition duration-300 ease-in-out`}
          onClick={() => handleTabChange('pro')}
          style={{ borderColor: 'zinc-800', borderWidth: 1 }}
        >
          Pro
        </button>
      </div>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-100">${selectedPlan.price}</h2>
        <p className="text-lg text-gray-400">Select this plan to unlock premium features</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        <button
          className={`w-full md:w-48 lg:w-64 xl:w-72 py-4 px-6 text-lg font-bold text-gray-100 bg-zinc-600 rounded-md hover:bg-zinc-700 transition duration-300 ease-in-out`}
          onClick={() => handlePlanChange({ name: 'Basic', price: 'Free' })}
          style={{ borderColor: 'zinc-800', borderWidth: 1 }}
        >
          Get Started Free
        </button>
        <button
          className={`w-full md:w-48 lg:w-64 xl:w-72 py-4 px-6 text-lg font-bold text-gray-100 bg-zinc-600 rounded-md hover:bg-zinc-700 transition duration-300 ease-in-out`}
          onClick={() => handlePlanChange({ name: 'Premium', price: '19.99' })}
          style={{ borderColor: 'zinc-800', borderWidth: 1 }}
        >
          Upgrade to Premium
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        <h2 className="text-2xl font-bold text-gray-100">Features</h2>
        <div
          className={`flex flex-wrap justify-center gap-6 mb-6 ${tab === 'basic' ? 'hidden' : 'block'}`}
        >
          <div className="max-w-xs">
            <div className="bg-zinc-600 rounded-md p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-100">Feature 1</h3>
              <p className="text-lg text-gray-400">{features[0].description}</p>
            </div>
            <button
              className={`w-full py-2 px-4 text-lg font-bold text-gray-100 bg-zinc-600 rounded-md hover:bg-zinc-700 transition duration-300 ease-in-out`}
              onClick={() => handleFeatureToggle(0)}
              style={{ borderColor: 'zinc-800', borderWidth: 1 }}
            >
              {features[0].expanded ? <PencilIcon className="text-lg text-gray-100" /> : <CogIcon className="text-lg text-gray-100" />}
            </button>
          </div>
          <div className="max-w-xs">
            <div className="bg-zinc-600 rounded-md p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-100">Feature 2</h3>
              <p className="text-lg text-gray-400">{features[1].description}</p>
            </div>
            <button
              className={`w-full py-2 px-4 text-lg font-bold text-gray-100 bg-zinc-600 rounded-md hover:bg-zinc-700 transition duration-300 ease-in-out`}
              onClick={() => handleFeatureToggle(1)}
              style={{ borderColor: 'zinc-800', borderWidth: 1 }}
            >
              {features[1].expanded ? <PencilIcon className="text-lg text-gray-100" /> : <CogIcon className="text-lg text-gray-100" />}
            </button>
          </div>
          <div className="max-w-xs">
            <div className="bg-zinc-600 rounded-md p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-100">Feature 3</h3>
              <p className="text-lg text-gray-400">{features[2].description}</p>
            </div>
            <button
              className={`w-full py-2 px-4 text-lg font-bold text-gray-100 bg-zinc-600 rounded-md hover:bg-zinc-700 transition duration-300 ease-in-out`}
              onClick={() => handleFeatureToggle(2)}
              style={{ borderColor: 'zinc-800', borderWidth: 1 }}
            >
              {features[2].expanded ? <PencilIcon className="text-lg text-gray-100" /> : <CogIcon className="text-lg text-gray-100" />}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-wrap justify-center gap-6 mb-16 ${tab === 'basic' ? 'hidden' : 'block'}`}
      >
        <div className="max-w-xs">
          <div className="bg-zinc-600 rounded-md p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-100">Premium Feature 1</h3>
            <p className="text-lg text-gray-400">This is a premium feature</p>
          </div>
          <button
            className={`w-full py-2 px-4 text-lg font-bold text-gray-100 bg-zinc-600 rounded-md hover:bg-zinc-700 transition duration-300 ease-in-out`}
            style={{ borderColor: 'zinc-800', borderWidth: 1 }}
          >
            <PencilIcon className="text-lg text-gray-100" />
          </button>
        </div>
        <div className="max-w-xs">
          <div className="bg-zinc-600 rounded-md p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-100">Premium Feature 2</h3>
            <p className="text-lg text-gray-400">This is another premium feature</p>
          </div>
          <button
            className={`w-full py-2 px-4 text-lg font-bold text-gray-100 bg-zinc-600 rounded-md hover:bg-zinc-700 transition duration-300 ease-in-out`}
            style={{ borderColor: 'zinc-800', borderWidth: 1 }}
          >
            <PencilIcon className="text-lg text-gray-100" />
          </button>
        </div>
        <div className="max-w-xs">
          <div className="bg-zinc-600 rounded-md p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-100">Premium Feature 3</h3>
            <p className="text-lg text-gray-400">This is the last premium feature</p>
          </div>
          <button
            className={`w-full py-2 px-4 text-lg font-bold text-gray-100 bg-zinc-600 rounded-md hover:bg-zinc-700 transition duration-300 ease-in-out`}
            style={{ borderColor: 'zinc-800', borderWidth: 1 }}
          >
            <PencilIcon className="text-lg text-gray-100" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;