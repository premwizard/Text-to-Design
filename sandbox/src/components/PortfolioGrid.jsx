import React from 'react';

const PortfolioGrid = () => {
  const projects = [
    {
      title: 'Aura Creative Branding',
      description: 'Redefining brand identity for leading digital agencies.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Project+1',
      tags: ['Branding', 'Design', 'Strategy'],
    },
    {
      title: 'Ethereal App UI/UX',
      description: 'Crafting intuitive and engaging user experiences for mobile applications.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Project+2',
      tags: ['UI/UX', 'App Development', 'Prototyping'],
    },
    {
      title: 'Luminous Web Development',
      description: 'Building high-performance, responsive websites that captivate.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Project+3',
      tags: ['Web Development', 'SEO', 'Performance'],
    },
    {
      title: 'Quantum Marketing Campaign',
      description: 'Data-driven marketing strategies that deliver measurable results.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Project+4',
      tags: ['Marketing', 'Analytics', 'Growth'],
    },
    {
      title: 'Nebula Motion Graphics',
      description: 'Bringing brands to life with dynamic and compelling motion design.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Project+5',
      tags: ['Motion Graphics', 'Animation', 'Video'],
    },
    {
      title: 'Stellar Product Design',
      description: 'Innovating and designing products that stand out in the market.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Project+6',
      tags: ['Product Design', 'Innovation', 'Research'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-zinc-900 text-zinc-300 font-dm-sans">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Latest Work</h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Explore a curated selection of our projects, showcasing our dedication to innovation and design excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-zinc-700"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-zinc-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-zinc-700 text-zinc-300 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;