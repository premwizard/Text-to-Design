import React from 'react';

export default function ProjectMasonry() {
  const projects = [
    { name: 'Project 1', description: 'This is project 1', image: 'https://picsum.photos/200/300' },
    { name: 'Project 2', description: 'This is project 2', image: 'https://picsum.photos/200/301' },
    { name: 'Project 3', description: 'This is project 3', image: 'https://picsum.photos/200/302' },
    { name: 'Project 4', description: 'This is project 4', image: 'https://picsum.photos/200/303' },
    { name: 'Project 5', description: 'This is project 5', image: 'https://picsum.photos/200/304' },
  ];

  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-900 rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10 hover:opacity-90 transition-all duration-200 cursor-pointer">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-100">{project.name}</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100">{project.description}</p>
              <img src={project.image} alt={project.name} className="w-full h-full object-cover rounded-3xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}