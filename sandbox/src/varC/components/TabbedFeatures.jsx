import React, { useState } from 'react';

export default function TabbedFeatures() {
  const [activeTab, setActiveTab] = useState('tab1');
  const tabs = [
    { id: 'tab1', title: 'Budgeting' },
    { id: 'tab2', title: 'Investing' },
    { id: 'tab3', title: 'Saving' }
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center py-12 md:py-20 lg:py-24">
      <div className="lg:w-1/2 md:px-8 xl:px-12 lg:px-16 flex flex-col items-center lg:items-start">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">Features</h2>
        <ul className="flex space-x-4 mt-4 lg:mt-8">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`py-2 px-4 rounded-full ${activeTab === tab.id ? 'bg-gold-500 text-white' : 'bg-white text-gray-800'} hover:opacity-90 transition-all duration-200 cursor-pointer`
                }
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
        {activeTab === 'tab1' && (
          <p className="text-lg md:text-2xl lg:text-3xl mt-4 lg:mt-8">Budgeting made easy with FinStride.</p>
        )}
        {activeTab === 'tab2' && (
          <p className="text-lg md:text-2xl lg:text-3xl mt-4 lg:mt-8">Investing made easy with FinStride.</p>
        )}
        {activeTab === 'tab3' && (
          <p className="text-lg md:text-2xl lg:text-3xl mt-4 lg:mt-8">Saving made easy with FinStride.</p>
        )}
      </div>
    </div>
  );
}