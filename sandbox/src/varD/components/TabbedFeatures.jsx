import React, { useState } from 'react';

export default function TabbedFeatures() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { name: 'Reliability', description: '99.99% uptime guarantee' },
    { name: 'Security', description: 'Enterprise-grade security features' },
    { name: 'Scalability', description: 'Auto-scaling to meet your needs' }
  ];

  return (
    <div className="container mx-auto p-12 pt-12 md:p-24">
      <div className="flex flex-wrap -mx-4">
        {tabs.map((tab, index) => (
          <div key={index} className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <button
              className={`py-4 px-8 rounded-lg text-lg font-bold ${activeTab === index ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} hover:opacity-90 transition-all duration-200 cursor-pointer`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <p className="text-2xl">{tabs[activeTab].description}</p>
      </div>
    </div>
  );
}