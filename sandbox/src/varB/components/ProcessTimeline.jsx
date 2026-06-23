import React from 'react';

export default function ProcessTimeline() {
  const steps = [
    { name: 'Step 1', description: 'This is step 1' },
    { name: 'Step 2', description: 'This is step 2' },
    { name: 'Step 3', description: 'This is step 3' },
    { name: 'Step 4', description: 'This is step 4' },
    { name: 'Step 5', description: 'This is step 5' },
  ];

  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="flex flex-col items-center justify-center">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-900 rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10 mb-4 sm:mb-6 lg:mb-8 xl:mb-10 hover:opacity-90 transition-all duration-200 cursor-pointer">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-100">{step.name}</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}