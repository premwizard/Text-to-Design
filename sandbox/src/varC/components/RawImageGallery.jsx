import React from 'react';

export default function RawImageGallery() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1616036735515-5c1a7e28a571?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Brutalist concrete block structure',
    },
    {
      src: 'https://images.unsplash.com/photo-1629854497559-21b0e008b8b0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDBwYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Industrial metal table in stark setting',
    },
    {
      src: 'https://images.unsplash.com/photo-1610416410385-e0c1f6c1f1f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Raw concrete wall with minimal light',
    },
    {
      src: 'https://images.unsplash.com/photo-1549480106-93d3954f9a72?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Textured brutalist interior detail',
    },
    {
      src: 'https://images.unsplash.com/photo-1629854497652-00d15d6a2f4c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Large industrial lamp with exposed bulb',
    },
    {
      src: 'https://images.unsplash.com/photo-1520633842343-41c2c31c4f51?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Abstract concrete texture on a building',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-stone-900 text-stone-100 border-b border-stone-700">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold font-['Space_Grotesk'] tracking-tighter mb-12 text-center md:text-left uppercase">
          Visual Manifesto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden border-2 border-stone-700
                          ${index === 0 ? 'md:col-span-2' : ''} 
                          ${index === 1 ? 'md:row-span-2' : ''}
                          ${index === 3 ? 'lg:col-span-2' : ''}
                          ${index === 5 ? 'md:col-span-2 lg:col-span-1' : ''}
                          group`}
              style={{
                aspectRatio: (index === 0 || index === 3) ? '16/9' : (index === 1 ? '3/4' : '1/1'),
                minHeight: index === 1 ? '400px' : 'auto'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}