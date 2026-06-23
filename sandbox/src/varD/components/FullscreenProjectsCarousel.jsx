import React, { useState } from 'react';

export default function FullscreenProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = [
    { title: 'Project 1', description: 'Lorem ipsum dolor sit amet.', image: 'https://example.com/project1.jpg' },
    { title: 'Project 2', description: 'Lorem ipsum dolor sit amet.', image: 'https://example.com/project2.jpg' },
    { title: 'Project 3', description: 'Lorem ipsum dolor sit amet.', image: 'https://example.com/project3.jpg' }
  ];

  return (
    <section className="relative bg-stone-950 py-20 lg:py-40">
      <div className="container mx-auto flex flex-col items-center justify-center text-stone-100">
        <h2 className="text-3xl font-bold">Projects</h2>
        <div className="flex justify-center mt-8">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`bg-stone-950 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded-md ${index === activeIndex ? 'bg-purple-500' : ''}`}
            >
              {project.title}
            </button>
          ))}
        </div>
        <div className="mt-12">
          <img src={projects[activeIndex].image} alt="Project Image" className="w-full h-full object-cover" />
          <h3 className="text-2xl font-bold mt-4">{projects[activeIndex].title}</h3>
          <p className="text-lg text-stone-100 mt-2">{projects[activeIndex].description}</p>
        </div>
      </div>
    </section>
  );
}