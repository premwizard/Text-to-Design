import React from 'react';

export default function GalleryGrid() {
  const projects = [
    { id: 1, title: 'Project 1', image: 'https://via.placeholder.com/300', description: 'This is project 1' },
    { id: 2, title: 'Project 2', image: 'https://via.placeholder.com/300', description: 'This is project 2' },
    { id: 3, title: 'Project 3', image: 'https://via.placeholder.com/300', description: 'This is project 3' },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-gray-800 hover:opacity-90 transition-all duration-200 cursor-pointer relative">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover absolute top-0 left-0" />
          <h2 className="text-2xl font-bold absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white">{project.title}</h2>
          <p className="text-sm absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white">{project.description}</p>
        </div>
      ))}
    </section>
  );
}