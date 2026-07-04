import React from 'react';

function AnalyticsChartsSection() {
  return (
    <section className="bg-white py-10 md:py-12 lg:py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 mb-4">Analytics Charts</h2>
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/2 px-4 mb-8 md:mb-0">
            <div className="bg-white rounded-md shadow-md p-4">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-900 mb-2">Chart 1</h3>
              <div className="h-64 bg-zinc-100 rounded-md"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 px-4 mb-8 md:mb-0">
            <div className="bg-white rounded-md shadow-md p-4">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-900 mb-2">Chart 2</h3>
              <div className="h-64 bg-zinc-100 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsChartsSection;