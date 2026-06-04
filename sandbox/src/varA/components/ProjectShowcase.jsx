import React from 'react';
import { ArrowRight, Globe, Code, Layout } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Cognitive Canvas',
    description: 'An AI-powered design tool that generates mood boards and initial wireframes based on textual prompts.',
    tags: ['AI/ML', 'Web Design', 'UI/UX'],
    imageUrl: 'https://images.unsplash.com/photo-1620207418313-01127e24419f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    link: '#',
  },
  {
    id: 2,
    title: 'Aura Analytics Dashboard',
    description: 'A sophisticated data visualization dashboard providing real-time insights for e-commerce businesses.',
    tags: ['Data Viz', 'React', 'Analytics'],
    imageUrl: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    link: '#',
  },
  {
    id: 3,
    title: 'Zenith CRM Redesign',
    description: 'A complete overhaul of an outdated CRM system, focusing on user experience and modern aesthetic.',
    tags: ['UX Redesign', 'SaaS', 'Accessibility'],
    imageUrl: 'https://images.unsplash.com/photo-1549692520-acc666925e0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    link: '#',
  },
  {
    id: 4,
    title: 'EcoHarvest Mobile App',
    description: 'Designing a native mobile application for local farmers to sell organic produce directly to consumers.',
    tags: ['Mobile App', 'Native UI', 'Sustainability'],
    imageUrl: 'https://images.unsplash.com/photo-1504805572947-cc6296a8a5b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    link: '#',
  },
];

export default function ProjectShowcase() {
  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12 w-full h-full flex flex-col justify-center">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 drop-shadow-sm">Recent Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group w-full max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl overflow-hidden
                       hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-tight">{project.title}</h3>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{project.description}</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-purple-500 font-medium hover:text-purple-600 transition-colors duration-200"
                >
                  View Case Study
                  <ArrowRight className="ml-2" size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}