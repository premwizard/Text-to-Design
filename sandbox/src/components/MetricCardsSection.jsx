import React from 'react';

function MetricCardsSection() {
  const metrics = [
    { title: 'Total Users', value: '10,000' },
    { title: 'Active Users', value: '5,000' },
    { title: 'Total Revenue', value: '$100,000' },
  ];

  return (
    <section className="bg-white py-10 md:py-12 lg:py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 mb-4">Key Metrics</h2>
        <div className="flex flex-wrap justify-center -mx-4">
          {metrics.map((metric, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 md:mb-0">
              <div className="bg-white rounded-md shadow-md p-4">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-900 mb-2">{metric.title}</h3>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MetricCardsSection;