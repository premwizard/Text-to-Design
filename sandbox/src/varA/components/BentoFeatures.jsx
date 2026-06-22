import React from 'react';

export default function BentoFeatures() {
  const features = [
    { id: 1, title: 'Task Management', description: 'Create and manage your tasks with ease.' },
    { id: 2, title: 'Team Collaboration', description: 'Collaborate with your team in real-time.' },
    { id: 3, title: 'Automated Workflows', description: 'Automate your workflows and increase productivity.' },
    { id: 4, title: 'Customizable Dashboards', description: 'Create customized dashboards to suit your needs.' },
    { id: 5, title: 'Integration with Third-Party Tools', description: 'Integrate with your favorite third-party tools.' },
  ];

  return (
    <section className="py-12 lg:py-24">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="bg-zinc-800 p-8 rounded-lg hover:opacity-90 transition-all duration-200 cursor-pointer">
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}