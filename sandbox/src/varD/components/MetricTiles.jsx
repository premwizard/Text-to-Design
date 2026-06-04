import React from 'react';

export default function MetricTiles() {
  const metrics = [
    { name: 'Active Users', value: 1000, percentage: 20 },
    { name: 'Engagement', value: 500, percentage: 10 },
    { name: 'Retention', value: 800, percentage: 15 }
  ];

  return (
    <section className="container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="bg-zinc-700 py-4 px-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-zinc-50">{metric.name}</h2>
          <p className="text-lg text-zinc-50">{metric.value}</p>
          <p className="text-sm text-zinc-50">{metric.percentage}% change</p>
        </div>
      ))}
    </section>
  );
}