import React from 'react';

export default function DataSummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4 lg:mt-6 xl:mt-8">
      <div className="bg-zinc-800 py-4 px-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-200">Active Users</h3>
        <p className="text-3xl font-bold text-cyan-400">1,234</p>
      </div>
      <div className="bg-zinc-800 py-4 px-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-200">Total Revenue</h3>
        <p className="text-3xl font-bold text-cyan-400">$10,000</p>
      </div>
      <div className="bg-zinc-800 py-4 px-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-200">Average Session Duration</h3>
        <p className="text-3xl font-bold text-cyan-400">10:45</p>
      </div>
    </div>
  );
}