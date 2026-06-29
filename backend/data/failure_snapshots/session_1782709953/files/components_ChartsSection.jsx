import React, { useState } from 'react';
import { ChartBar, ChartPie, Eye, EyeOff } from 'lucide-react-native';
import { Link } from 'react-router-dom';

const ChartsSection = () => {
  const [toggleState, setToggleState] = useState(1);
  const [chartType, setChartType] = useState('bar');
  const [filter, setFilter] = useState('all');

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleChartType = (type) => {
    setChartType(type);
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  return (
    <div className="bg-zinc-800 rounded-md shadow-md p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-medium">Comprehensive Analytics Dashboard</h2>
        <div className="flex items-center">
          <button
            className={`bg-zinc-600 hover:bg-zinc-700 rounded-md p-2 md:p-3 lg:p-4 ${chartType === 'bar' ? 'bg-zinc-700' : ''}`}
            onClick={() => handleChartType('bar')}
          >
            <ChartBar size={20} className="text-zinc-400" />
          </button>
          <button
            className={`bg-zinc-600 hover:bg-zinc-700 rounded-md p-2 md:p-3 lg:p-4 ${chartType === 'pie' ? 'bg-zinc-700' : ''}`}
            onClick={() => handleChartType('pie')}
          >
            <ChartPie size={20} className="text-zinc-400" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mb-4">
        <button
          className={`bg-zinc-600 hover:bg-zinc-700 rounded-md p-2 md:p-3 lg:p-4 ${toggleState === 1 ? 'bg-zinc-700' : ''}`}
          onClick={() => toggleTab(1)}
        >
          Overview
        </button>
        <button
          className={`bg-zinc-600 hover:bg-zinc-700 rounded-md p-2 md:p-3 lg:p-4 ${toggleState === 2 ? 'bg-zinc-700' : ''}`}
          onClick={() => toggleTab(2)}
        >
          Insights
        </button>
        <button
          className={`bg-zinc-600 hover:bg-zinc-700 rounded-md p-2 md:p-3 lg:p-4 ${toggleState === 3 ? 'bg-zinc-700' : ''}`}
          onClick={() => toggleTab(3)}
        >
          Trends
        </button>
      </div>
      <div className="flex flex-wrap justify-center mb-4">
        <button
          className={`bg-zinc-600 hover:bg-zinc-700 rounded-md p-2 md:p-3 lg:p-4 ${filter === 'all' ? 'bg-zinc-700' : ''}`}
          onClick={() => handleFilter('all')}
        >
          All
        </button>
        <button
          className={`bg-zinc-600 hover:bg-zinc-700 rounded-md p-2 md:p-3 lg:p-4 ${filter === 'monthly' ? 'bg-zinc-700' : ''}`}
          onClick={() => handleFilter('monthly')}
        >
          Monthly
        </button>
        <button
          className={`bg-zinc-600 hover:bg-zinc-700 rounded-md p-2 md:p-3 lg:p-4 ${filter === 'yearly' ? 'bg-zinc-700' : ''}`}
          onClick={() => handleFilter('yearly')}
        >
          Yearly
        </button>
      </div>
      <div className="relative">
        {toggleState === 1 && (
          <div className="bg-zinc-700 rounded-md p-4 md:p-6 lg:p-8">
            <h3 className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-medium mb-4">Overview</h3>
            <p className="text-zinc-400 text-sm md:text-base lg:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            {filter === 'all' && (
              <div className="bg-zinc-600 rounded-md p-2 md:p-3 lg:p-4 mt-4">
                <h4 className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium mb-2">All Data</h4>
                <p className="text-zinc-400 text-xs md:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
              </div>
            )}
            {filter === 'monthly' && (
              <div className="bg-zinc-600 rounded-md p-2 md:p-3 lg:p-4 mt-4">
                <h4 className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium mb-2">Monthly Data</h4>
                <p className="text-zinc-400 text-xs md:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
              </div>
            )}
            {filter === 'yearly' && (
              <div className="bg-zinc-600 rounded-md p-2 md:p-3 lg:p-4 mt-4">
                <h4 className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium mb-2">Yearly Data</h4>
                <p className="text-zinc-400 text-xs md:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
              </div>
            )}
          </div>
        )}
        {toggleState === 2 && (
          <div className="bg-zinc-700 rounded-md p-4 md:p-6 lg:p-8">
            <h3 className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-medium mb-4">Insights</h3>
            <p className="text-zinc-400 text-sm md:text-base lg:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            {filter === 'all' && (
              <div className="bg-zinc-600 rounded-md p-2 md:p-3 lg:p-4 mt-4">
                <h4 className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium mb-2">All Insights</h4>
                <p className="text-zinc-400 text-xs md:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
              </div>
            )}
            {filter === 'monthly' && (
              <div className="bg-zinc-600 rounded-md p-2 md:p-3 lg:p-4 mt-4">
                <h4 className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium mb-2">Monthly Insights</h4>
                <p className="text-zinc-400 text-xs md:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
              </div>
            )}
            {filter === 'yearly' && (
              <div className="bg-zinc-600 rounded-md p-2 md:p-3 lg:p-4 mt-4">
                <h4 className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium mb-2">Yearly Insights</h4>
                <p className="text-zinc-400 text-xs md:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
              </div>
            )}
          </div>
        )}
        {toggleState === 3 && (
          <div className="bg-zinc-700 rounded-md p-4 md:p-6 lg:p-8">
            <h3 className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-medium mb-4">Trends</h3>
            <p className="text-zinc-400 text-sm md:text-base lg:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            {filter === 'all' && (
              <div className="bg-zinc-600 rounded-md p-2 md:p-3 lg:p-4 mt-4">
                <h4 className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium mb-2">All Trends</h4>
                <p className="text-zinc-400 text-xs md:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
              </div>
            )}
            {filter === 'monthly' && (
              <div className="bg-zinc-600 rounded-md p-2 md:p-3 lg:p-4 mt-4">
                <h4 className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium mb-2">Monthly Trends</h4>
                <p className="text-zinc-400 text-xs md:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
              </div>
            )}
            {filter === 'yearly' && (
              <div className="bg-zinc-600 rounded-md p-2 md:p-3 lg:p-4 mt-4">
                <h4 className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium mb-2">Yearly Trends</h4>
                <p className="text-zinc-400 text-xs md:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
              </div>
            )}
          </div>
        )}
        <button
          className="bg-zinc-600 hover:bg-zinc-700 rounded-md p-2 md:p-3 lg:p-4 absolute top-4 right-4"
          onClick={() => console.log('Button clicked')}
        >
          <Eye size={20} className="text-zinc-400" />
        </button>
        <button
          className="bg-zinc-600 hover:bg-zinc-700 rounded-md p-2 md:p-3 lg:p-4 absolute top-12 right-4"
          onClick={() => console.log('Button clicked')}
        >
          <EyeOff size={20} className="text-zinc-400" />
        </button>
      </div>
    </div>
  );
};

export default ChartsSection;