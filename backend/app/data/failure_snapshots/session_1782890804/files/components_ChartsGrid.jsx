import React from 'react';

const ChartsGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
      {data.map((chart) => (
        <div
          key={chart.id}
          className="bg-zinc-800 text-zinc-200 rounded-md shadow-sm p-4 border border-zinc-700 hover:shadow-md transition-shadow duration-200 flex flex-col"
        >
          <h3 className="text-base font-medium text-zinc-300 mb-2">{chart.title}</h3>
          <div className="flex-grow bg-zinc-700 rounded-sm flex items-center justify-center text-zinc-400 text-sm italic h-48 sm:h-64">
            {chart.type} Placeholder
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartsGrid;