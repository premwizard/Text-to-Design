import React from 'react';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Horizon Digital Reimagined',
    category: 'Brand Strategy & Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1517036665002-39ed20ce2380?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    description: 'A comprehensive brand overhaul and modern web presence for a leading digital marketing agency, focusing on user experience and conversion optimization.',
  },
  {
    id: 2,
    title: 'EcoVibe Sustainable Living',
    category: 'E-commerce & UX Development',
    imageUrl: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    description: 'Developed an intuitive and visually rich e-commerce platform for eco-friendly products, integrating seamless shopping carts and engaging product displays.',
  },
  {
    id: 3,
    title: 'Summit Financial Portal',
    category: 'Enterprise UI/UX Redesign',
    imageUrl: 'https://images.unsplash.com/photo-1550592818-197171e06d9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    description: 'Redesigned a complex financial dashboard for better usability and data visualization, improving user engagement and operational efficiency for professionals.',
  },
  {
    id: 4,
    title: 'Culinary Craft Blog & App',
    category: 'Content Platform & Mobile App',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    description: 'Created a vibrant recipe blog and accompanying mobile application, featuring personalized meal planning and interactive cooking guides for food enthusiasts.',
  },
  {
    id: 5,
    title: 'Urban Oasis Co-working Space',
    category: 'Interactive Landing Page & Booking System',
    imageUrl: 'https://images.unsplash.com/photo-1549429188-f54f738a1663?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    description: 'Designed an engaging landing page with integrated booking functionalities for a modern co-working space, highlighting features and membership tiers.',
  },
];

export default function FeaturedProjectsGrid() {
  return (
    <section id="projects" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
            style={{ fontFamily: 'Playfair Display, serif' }}>
          Our Creative Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`relative group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out
                ${index === 0 ? 'md:col-span-2' : ''} 
                ${index === 3 ? 'md:row-span-2 md:aspect-[3/4] lg:aspect-[unset]' : ''} 
              `}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent flex items-end p-6">
                <div className="text-white opacity-100 group-hover:opacity-0 transition-opacity duration-300 absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{project.title}</h3>
                  <p className="text-indigo-200 text-sm">{project.category}</p>
                </div>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col justify-center items-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{project.title}</h3>
                  <p className="text-gray-200 mb-4 text-base leading-relaxed max-w-sm">{project.description}</p>
                  <a
                    href="#"
                    className="inline-flex items-center text-indigo-300 hover:text-indigo-100 font-medium group transition-all duration-200 cursor-pointer"
                  >
                    View Project
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}