import React from 'react';

export default function DesignerSpotlight() {
  const designers = [
    {
      id: 1,
      name: 'Elara Vance',
      ethos: 'Minimalist forms, sustainable materials, timeless appeal.',
      image: 'https://images.unsplash.com/photo-1596700813955-40742d4a6ec3?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      direction: 'left',
    },
    {
      id: 2,
      name: 'Kaelen Thorne',
      ethos: 'Bold textures, experimental silhouettes, architectural influence.',
      image: 'https://images.unsplash.com/photo-1628173510255-b0b9a89d3110?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      direction: 'right',
    },
    {
      id: 3,
      name: 'Lia Renard',
      ethos: 'Delicate craftsmanship, intricate details, inspired by nature.',
      image: 'https://images.unsplash.com/photo-1601618342415-ef6e6c1e1c3e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      direction: 'left',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] text-center mb-16 md:mb-24 text-neutral-900">
          Meet Our Visionaries
        </h2>

        {designers.map((designer, index) => (
          <div
            key={designer.id}
            className={`flex flex-col md:flex-row items-center my-16 md:my-24 gap-10 lg:gap-20
              ${designer.direction === 'right' ? 'md:flex-row-reverse' : ''}
            `}
          >
            <div className="w-full md:w-1/2 lg:w-3/5 overflow-hidden shadow-lg">
              <img
                src={designer.image}
                alt={`Portrait of designer ${designer.name}`}
                className="w-full h-[500px] md:h-[650px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 px-4 text-center md:text-left">
              <h3 className="text-4xl font-['Playfair_Display'] text-neutral-900 mb-4">
                {designer.name}
              </h3>
              <p className="text-lg leading-relaxed text-neutral-700 mb-6">
                {designer.ethos}
              </p>
              <p className="text-md text-neutral-600 italic">
                "Fashion is not merely clothing; it's a narrative, a reflection of the soul. My designs aim to tell stories of quiet strength and enduring beauty."
              </p>
              <button className="mt-8 px-8 py-3 bg-neutral-900 text-white text-md tracking-wide uppercase font-medium
                                 hover:opacity-90 transition-all duration-200 cursor-pointer">
                View {designer.name}'s Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}