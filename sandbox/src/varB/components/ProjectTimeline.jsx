import React from 'react';

export default function ProjectTimeline() {
  const projects = [
    {
      year: '2023',
      title: 'Project Aurora',
      description: 'Redesigned the core interface for a leading SaaS platform, focusing on user-centric design and performance optimization. Achieved a 30% reduction in load times.'
    },
    {
      year: '2022',
      title: 'Echo Chamber Identity',
      description: 'Developed a comprehensive brand identity and digital presence for a new music streaming service. Focused on creating a disruptive visual language.'
    },
    {
      year: '2021',
      title: 'Nexus Platform Reimagined',
      description: 'Spearheaded the UI/UX overhaul of a complex data visualization tool, enhancing discoverability and user engagement through intuitive layouts.'
    }
  ];

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 bg-zinc-900">
      <h2 className="text-4xl lg:text-6xl font-bold mb-12 text-center text-yellow-400 uppercase">Project Archive</h2>
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`lg:col-span-1 p-8 border-4 border-yellow-400 bg-zinc-950 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/30 ${index % 2 === 0 ? 'self-start' : 'self-end'}`}
          >
            <div className="text-sm text-gray-400 mb-4">{project.year}</div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400 uppercase">{project.title}</h3>
            <p className="leading-relaxed text-gray-300">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}