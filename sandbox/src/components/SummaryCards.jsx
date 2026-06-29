import React, { useState } from 'react';
import { Globe2, TrendingUp, Users } from 'lucide-react-native';
import { Link } from 'react-router-dom';

const SummaryCards = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4 mb-4">
      <div className="w-full lg:w-1/3 xl:w-1/3 p-6 bg-zinc-800 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <Globe2 size={24} className="text-zinc-400" />
          <h2 className="ml-4 text-lg font-medium text-zinc-200">Global Reach</h2>
        </div>
        <p className="text-zinc-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
        <button className="mt-4 bg-zinc-600 hover:bg-zinc-700 text-zinc-200 py-2 px-4 rounded-md">Learn More</button>
      </div>
      <div className="w-full lg:w-1/3 xl:w-1/3 p-6 bg-zinc-800 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <TrendingUp size={24} className="text-zinc-400" />
          <h2 className="ml-4 text-lg font-medium text-zinc-200">Trending Insights</h2>
        </div>
        <p className="text-zinc-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
        <button className="mt-4 bg-zinc-600 hover:bg-zinc-700 text-zinc-200 py-2 px-4 rounded-md">View Insights</button>
      </div>
      <div className="w-full lg:w-1/3 xl:w-1/3 p-6 bg-zinc-800 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <Users size={24} className="text-zinc-400" />
          <h2 className="ml-4 text-lg font-medium text-zinc-200">User Engagement</h2>
        </div>
        <p className="text-zinc-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
        <button className="mt-4 bg-zinc-600 hover:bg-zinc-700 text-zinc-200 py-2 px-4 rounded-md">Engage Now</button>
      </div>
    </div>
  );
};

export default SummaryCards;