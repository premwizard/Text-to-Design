import React, { useState } from 'react';
import { Globe2, TrendingUp, Users } from 'lucide-react-native';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SummaryCards = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [filter, setFilter] = useState('monthly');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Global Reach',
        data: [10, 20, 30, 40, 50, 60],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Trending Insights',
        data: [60, 50, 40, 30, 20, 10],
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
      {
        label: 'User Engagement',
        data: [20, 30, 40, 50, 60, 70],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Comprehensive Analytics Dashboard',
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4 mb-4">
      <div className="w-full lg:w-1/3 xl:w-1/3 p-6 bg-zinc-800 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <Globe2 size={24} className="text-zinc-400" />
          <h2 className="ml-4 text-lg font-medium text-zinc-200">Global Reach</h2>
        </div>
        <p className="text-zinc-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
        <div className="mt-4">
          <Line options={options} data={data} />
        </div>
        <div className="mt-4 flex gap-4">
          <button
            className={`py-2 px-4 rounded-md ${filter === 'monthly' ? 'bg-zinc-600 hover:bg-zinc-700 text-zinc-200' : 'bg-zinc-700 text-zinc-400'}`}
            onClick={() => handleFilterChange('monthly')}
          >
            Monthly
          </button>
          <button
            className={`py-2 px-4 rounded-md ${filter === 'quarterly' ? 'bg-zinc-600 hover:bg-zinc-700 text-zinc-200' : 'bg-zinc-700 text-zinc-400'}`}
            onClick={() => handleFilterChange('quarterly')}
          >
            Quarterly
          </button>
          <button
            className={`py-2 px-4 rounded-md ${filter === 'yearly' ? 'bg-zinc-600 hover:bg-zinc-700 text-zinc-200' : 'bg-zinc-700 text-zinc-400'}`}
            onClick={() => handleFilterChange('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="w-full lg:w-1/3 xl:w-1/3 p-6 bg-zinc-800 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <TrendingUp size={24} className="text-zinc-400" />
          <h2 className="ml-4 text-lg font-medium text-zinc-200">Trending Insights</h2>
        </div>
        <p className="text-zinc-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
        <div className="mt-4">
          <Line options={options} data={data} />
        </div>
        <div className="mt-4 flex gap-4">
          <button
            className={`py-2 px-4 rounded-md ${filter === 'monthly' ? 'bg-zinc-600 hover:bg-zinc-700 text-zinc-200' : 'bg-zinc-700 text-zinc-400'}`}
            onClick={() => handleFilterChange('monthly')}
          >
            Monthly
          </button>
          <button
            className={`py-2 px-4 rounded-md ${filter === 'quarterly' ? 'bg-zinc-600 hover:bg-zinc-700 text-zinc-200' : 'bg-zinc-700 text-zinc-400'}`}
            onClick={() => handleFilterChange('quarterly')}
          >
            Quarterly
          </button>
          <button
            className={`py-2 px-4 rounded-md ${filter === 'yearly' ? 'bg-zinc-600 hover:bg-zinc-700 text-zinc-200' : 'bg-zinc-700 text-zinc-400'}`}
            onClick={() => handleFilterChange('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="w-full lg:w-1/3 xl:w-1/3 p-6 bg-zinc-800 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <Users size={24} className="text-zinc-400" />
          <h2 className="ml-4 text-lg font-medium text-zinc-200">User Engagement</h2>
        </div>
        <p className="text-zinc-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
        <div className="mt-4">
          <Line options={options} data={data} />
        </div>
        <div className="mt-4 flex gap-4">
          <button
            className={`py-2 px-4 rounded-md ${filter === 'monthly' ? 'bg-zinc-600 hover:bg-zinc-700 text-zinc-200' : 'bg-zinc-700 text-zinc-400'}`}
            onClick={() => handleFilterChange('monthly')}
          >
            Monthly
          </button>
          <button
            className={`py-2 px-4 rounded-md ${filter === 'quarterly' ? 'bg-zinc-600 hover:bg-zinc-700 text-zinc-200' : 'bg-zinc-700 text-zinc-400'}`}
            onClick={() => handleFilterChange('quarterly')}
          >
            Quarterly
          </button>
          <button
            className={`py-2 px-4 rounded-md ${filter === 'yearly' ? 'bg-zinc-600 hover:bg-zinc-700 text-zinc-200' : 'bg-zinc-700 text-zinc-400'}`}
            onClick={() => handleFilterChange('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;