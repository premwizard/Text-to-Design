import React from 'react';

export default function RawStats() {
  const stats = [
    { name: 'Customers', value: 1000 },
    { name: 'Servers', value: 500 },
    { name: 'Uptime', value: '99.99%' }
  ];

  return (
    <div className="container mx-auto p-12 pt-12 md:p-24">
      <div className="flex flex-wrap -mx-4">
        {stats.map((stat, index) => (
          <div key={index} className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <div className="bg-gray-200 p-8 rounded-lg">
              <h2 className="text-3xl font-bold">{stat.value}</h2>
              <p className="text-lg">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}