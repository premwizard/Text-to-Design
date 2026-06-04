import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function InteractiveCatalog() {
  const [tab, setTab] = useState('all');

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      <div className="flex flex-wrap justify-center">
        <button
          className={`px-4 py-2 rounded ${tab === 'all' ? 'bg-cyan-400' : 'bg-gray-800'} hover:opacity-90 transition-all duration-200 cursor-pointer`}
          onClick={() => handleTabChange('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'cyberdecks' ? 'bg-cyan-400' : 'bg-gray-800'} hover:opacity-90 transition-all duration-200 cursor-pointer`}
          onClick={() => handleTabChange('cyberdecks')}
        >
          Cyberdecks
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'smartguns' ? 'bg-cyan-400' : 'bg-gray-800'} hover:opacity-90 transition-all duration-200 cursor-pointer`}
          onClick={() => handleTabChange('smartguns')}
        >
          Smartguns
        </button>
      </div>
      {tab === 'all' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          <div className="bg-gray-800 p-4 rounded hover:opacity-90 transition-all duration-200 cursor-pointer">
            <h3 className="text-lg font-bold text-gray-100">Cyberdeck</h3>
            <p className="text-sm text-gray-100">$999.99</p>
          </div>
          <div className="bg-gray-800 p-4 rounded hover:opacity-90 transition-all duration-200 cursor-pointer">
            <h3 className="text-lg font-bold text-gray-100">Smartgun</h3>
            <p className="text-sm text-gray-100">$499.99</p>
          </div>
        </div>
      )}
      {tab === 'cyberdecks' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          <div className="bg-gray-800 p-4 rounded hover:opacity-90 transition-all duration-200 cursor-pointer">
            <h3 className="text-lg font-bold text-gray-100">Cyberdeck</h3>
            <p className="text-sm text-gray-100">$999.99</p>
          </div>
        </div>
      )}
      {tab === 'smartguns' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          <div className="bg-gray-800 p-4 rounded hover:opacity-90 transition-all duration-200 cursor-pointer">
            <h3 className="text-lg font-bold text-gray-100">Smartgun</h3>
            <p className="text-sm text-gray-100">$499.99</p>
          </div>
        </div>
      )}
    </div>
  );
}