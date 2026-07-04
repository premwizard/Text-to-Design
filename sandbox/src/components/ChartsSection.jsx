import React, { useState, useEffect } from 'react';

function ChartsSection() {
  const [chartsData, setChartsData] = useState([
    { id: 1, label: 'Chart 1', value: 10 },
    { id: 2, label: 'Chart 2', value: 20 },
    { id: 3, label: 'Chart 3', value: 30 },
  ]);

  const [activeChart, setActiveChart] = useState(chartsData[0]);

  const handleChartClick = (chart) => {
    setActiveChart(chart);
  };

  return (
    <section className="bg-white py-12 md:py-24 lg:py-36">
      <div className="container mx-auto flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-zinc-900 mb-4 md:mb-6 lg:mb-8">Charts</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {chartsData.map((chart) => (
            <button
              key={chart.id}
              className={`bg-zinc-100 py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 rounded-md hover:bg-zinc-200 transition duration-200 ${
                activeChart.id === chart.id ? 'bg-zinc-200' : ''
              }`}
              onClick={() => handleChartClick(chart)}
            >
              {chart.label}
            </button>
          ))}
        </div>
        <div className="mt-4 md:mt-6 lg:mt-8">
          <h3 className="text-zinc-900 text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 lg:mb-4">
            {activeChart.label}
          </h3>
          <p className="text-zinc-900 text-lg md:text-xl lg:text-2xl">
            Value: {activeChart.value}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChartsSection;