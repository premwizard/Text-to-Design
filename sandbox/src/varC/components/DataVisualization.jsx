import React from 'react';

export default function DataVisualization() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center py-12 md:py-20 lg:py-24">
      <div className="lg:w-1/2 md:px-8 xl:px-12 lg:px-16 flex flex-col items-center lg:items-start">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">Data Visualization</h2>
        <p className="text-lg md:text-2xl lg:text-3xl mt-4 lg:mt-8">Get insights into your financial data with FinStride.</p>
        <img src="https://via.placeholder.com/400x400" alt="Data Visualization" className="md:w-1/2 lg:w-full xl:h-full lg:h-full object-contain lg:object-cover"/>
      </div>
    </div>
  );
}