import React, { useState } from 'react';

export default function FeatureAccordion() {
  const [isOpen, setIsOpen] = useState({});
  const features = [
    { id: 1, title: 'Code Review', description: 'Get instant feedback on your code with our AI-powered review tool.' },
    { id: 2, title: 'Project Management', description: 'Keep track of your projects with our intuitive management system.' },
    { id: 3, title: 'Code Snippets', description: 'Save time with our pre-built code snippets for common tasks.' }
  ];

  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold mb-4">Features</h2>
      {features.map((feature) => (
        <div key={feature.id} className="mb-4">
          <button className="flex justify-between w-full text-left py-4 hover:opacity-90 transition-all duration-200 cursor-pointer" onClick={() => setIsOpen((prev) => ({ ...prev, [feature.id]: !prev[feature.id] }))}> 
            {feature.title}
            <span className={`text-red-600 ${isOpen[feature.id] ? 'rotate-180' : ''}`}>{'>>'}</span>
          </button>
          {isOpen[feature.id] && (
            <p className="text-lg mb-4">{feature.description}</p>
          )}
        </div>
      ))}
    </section>
  );
}