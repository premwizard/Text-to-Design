import React from 'react'

export default function ProjectGallery() {
  const projects = [
    { title: 'Project 1', description: 'This is project 1', image: 'https://via.placeholder.com/300' },
    { title: 'Project 2', description: 'This is project 2', image: 'https://via.placeholder.com/300' },
    { title: 'Project 3', description: 'This is project 3', image: 'https://via.placeholder.com/300' },
  ]

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-8">Our Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-md">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white mb-4">{project.description}</p>
            <img src={project.image} alt="Project Image" className="w-full h-64 object-cover rounded-md"/>
          </div>
        ))}
      </div>
    </div>
  )
}