import React from 'react';

export default function FeatureAdoptionCard() {
  const features = [
    { name: 'Feature A', value: 80 },
    { name: 'Feature B', value: 60 },
    { name: 'Feature C', value: 40 }
  ];

  return (
    <section className="container mx-auto py-8">
      <div className="bg-zinc-700 py-4 px-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-zinc-50">Feature Adoption</h2>
        <ul>
          {features.map((feature) => (
            <li key={feature.name} className="py-2 border-b border-zinc-600">
              <span className="text-zinc-50">{feature.name}</span>
              <span className="text-zinc-50">{feature.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}