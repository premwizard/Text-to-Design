import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Aurora UI Kit",
    description: "A minimalist UI kit for modern web applications. Features clean typography and intuitive layouts.",
    tags: ["UI/UX Design", "Figma", "Web Design"],
    imageUrl: "https://via.placeholder.com/600x400?text=Aurora+UI+Kit",
    details: "Aurora UI Kit is designed for speed and flexibility. It includes over 50 meticulously crafted components, ready to be used in your next project. Available in light and dark modes."
  },
  {
    id: 2,
    title: "Nebula Branding",
    description: "Comprehensive brand identity design for a new tech startup.",
    tags: ["Branding", "Logo Design", "Strategy"],
    imageUrl: "https://via.placeholder.com/600x400?text=Nebula+Branding",
    details: "We developed a complete brand identity for Nebula, encompassing logo, color palette, typography, and brand guidelines. Our approach focused on creating a memorable and scalable visual language."
  },
  {
    id: 3,
    title: "Quantum App Interface",
    description: "Interactive prototype for a data visualization application.",
    tags: ["Prototyping", "UI/UX", "Data Viz"],
    imageUrl: "https://via.placeholder.com/600x400?text=Quantum+App+Interface",
    details: "The Quantum App Interface was built using Figma's interactive features to simulate a real-world data exploration experience. It allows users to dynamically filter and analyze complex datasets."
  },
  {
    id: 4,
    title: "Celestial Website Redesign",
    description: "Revitalizing an e-commerce platform for enhanced user engagement.",
    tags: ["Web Design", "E-commerce", "UI/UX"],
    imageUrl: "https://via.placeholder.com/600x400?text=Celestial+Website",
    details: "Our redesign for Celestial focused on streamlining the customer journey, improving product discoverability, and increasing conversion rates. The new design is responsive and optimized for all devices."
  },
  {
    id: 5,
    title: "Cosmic Marketing Campaign",
    description: "Creative direction for a multi-channel digital marketing campaign.",
    tags: ["Marketing", "Digital Strategy", "Content Creation"],
    imageUrl: "https://via.placeholder.com/600x400?text=Cosmic+Marketing",
    details: "The Cosmic campaign aimed to build brand awareness and drive user acquisition through engaging social media content, targeted ads, and influencer collaborations. Success was measured by key performance indicators."
  },
  {
    id: 6,
    title: "Stellar Illustration Series",
    description: "A collection of digital illustrations for editorial use.",
    tags: ["Illustration", "Digital Art", "Editorial"],
    imageUrl: "https://via.placeholder.com/600x400?text=Stellar+Illustration",
    details: "This series of illustrations explores themes of space and technology, designed to complement articles and enhance visual storytelling in digital publications. Each piece is crafted with attention to detail and artistic flair."
  }
];

export default function BentoProjectsGrid() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="container mx-auto px-6 py-16 lg:py-24">
      <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${expandedId === project.id ? 'lg:col-span-3 lg:row-span-2 bg-white' : ''}`}
            onClick={() => toggleExpand(project.id)}
          >
            <img src={project.imageUrl} alt={project.title} className={`w-full object-cover transition-all duration-500 ease-in-out ${expandedId === project.id ? 'h-64' : 'h-48'}`}
            />
            <div className="p-6">
              <h3 className={`text-2xl font-bold mb-2 ${expandedId === project.id ? 'text-teal-600' : ''}`}>
                {project.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span key={index} className="text-xs font-medium text-teal-700 bg-teal-100 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              {expandedId === project.id && (
                <div className="mt-6 animate-fade-in">
                  <p className="text-neutral-800 leading-relaxed">
                    {project.details}
                  </p>
                  <button className="mt-6 bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer">
                    View Project
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}