import React from 'react';

const features = [
  {
    title: 'AI-Powered Sketching',
    description: 'Generate initial design concepts from simple text prompts or rough sketches. Our AI understands your intent to provide diverse and relevant starting points.',
    imageUrl: 'https://images.unsplash.com/photo-1606857003271-44b98635f0c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    alt: 'AI Sketching Interface',
    variant: 'image-left'
  },
  {
    title: 'Smart Color Palettes',
    description: 'Discover harmonious color schemes curated by AI. Explore trending palettes or generate custom sets based on mood, brand, or existing visuals.',
    imageUrl: 'https://images.unsplash.com/photo-1598224751091-72a6d49a882b?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    alt: 'Color Palette Generator',
    variant: 'image-right'
  },
  {
    title: 'Vector Refinement Tools',
    description: 'Automatically clean up vector paths, adjust curves, and optimize elements for scalability. Spend less time on tedious edits and more on creative direction.',
    imageUrl: 'https://images.unsplash.com/photo-1617042202104-7c0295e4a55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    alt: 'Vector Refinement UI',
    variant: 'image-left'
  }
];

export default function EditorialFeatures() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Unlock Your Creative Potential</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Artisan AI provides a suite of powerful, intuitive tools designed to augment your design process.</p>
        </div>

        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex flex-col lg:flex-row items-center justify-between gap-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} py-16 border-b border-gray-200 last:border-b-0`}
          >
            <div className={`w-full lg:w-1/2 ${feature.variant === 'image-left' ? 'lg:pr-16' : 'lg:pl-16'}`}>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                {feature.title}
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-gray-600 mb-8">
                {feature.description}
              </p>
              <button className="bg-pink-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer">
                Explore Feature
              </button>
            </div>
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative shadow-lg rounded-lg overflow-hidden">
              <img 
                src={feature.imageUrl}
                alt={feature.alt}
                className="w-full h-auto object-cover rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-10 -z-1"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}