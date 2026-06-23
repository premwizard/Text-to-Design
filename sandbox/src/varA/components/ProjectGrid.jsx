import React from 'react';

export default function ProjectGrid() {
  const projects = [
    {
      id: 1,
      title: "Elysian Fields Resort",
      description: "A luxury resort branding campaign that captured serene escapism.",
      imageUrl: "https://via.placeholder.com/720x540/add8e6/ffffff?text=Elysian+Fields",
      alt: "Elysian Fields Resort branding"
    },
    {
      id: 2,
      title: "Aura Skincare",
      description: "Minimalist product packaging and web design for a clean beauty brand.",
      imageUrl: "https://via.placeholder.com/720x540/e6e6fa/ffffff?text=Aura+Skincare",
      alt: "Aura Skincare product packaging"
    },
    {
      id: 3,
      title: "Momentum Labs",
      description: "Dynamic visual identity for a cutting-edge tech incubator.",
      imageUrl: "https://via.placeholder.com/720x540/d3d3d3/ffffff?text=Momentum+Labs",
      alt: "Momentum Labs visual identity"
    },
    {
      id: 4,
      title: "Terra Firma Wines",
      description: "Elegant labels and marketing collateral for a boutique vineyard.",
      imageUrl: "https://via.placeholder.com/720x540/f5deb3/ffffff?text=Terra+Firma",
      alt: "Terra Firma Wines labels"
    }
  ];

  return (
    <section className="py-20 px-8">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-xl">
              <img 
                src={project.imageUrl}
                alt={project.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-8 left-8 right-8 p-4 bg-white/90 rounded-lg shadow-sm">
                <h3 className="text-3xl font-bold mb-3 text-gray-900 group-hover:text-pink-500 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}