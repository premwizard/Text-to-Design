import React from 'react';

export default function ProcessOverview() {
  const steps = [
    { id: 1, title: 'Step 1', description: 'This is step 1' },
    { id: 2, title: 'Step 2', description: 'This is step 2' },
    { id: 3, title: 'Step 3', description: 'This is step 3' },
  ];

  return (
    <section className="flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold">Our Process</h2>
      {steps.map((step) => (
        <div key={step.id} className="flex items-center space-x-4 my-4">
          <h3 className="text-2xl font-bold">{step.title}</h3>
          <p className="text-sm">{step.description}</p>
        </div>
      ))}
    </section>
  );
}