import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function FeatureAccordion() {
  const [expanded, setExpanded] = useState(false);
  const features = [
    { title: 'Feature 1', description: 'Description 1' },
    { title: 'Feature 2', description: 'Description 2' },
    { title: 'Feature 3', description: 'Description 3' }
  ];

  return (
    <div className="container mx-auto p-4 lg:p-8">
      {features.map((feature, index) => (
        <div key={index} className="mb-4">
          <button className="bg-purple-500 hover:opacity-90 transition-all duration-200 cursor-pointer text-zinc-100 py-2 px-4 rounded w-full flex justify-between" onClick={() => setExpanded(index === expanded ? null : index)}>
            <span>{feature.title}</span>
            <ArrowRight size={24} className="mr-2"/>
          </button>
          {expanded === index && (
            <div className="mt-4 p-4 bg-stone-800 rounded-lg">
              <p>{feature.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}