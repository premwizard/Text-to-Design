import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

export default function ProductCardGrid() {
  const products = [
    {
      id: 1,
      name: 'Modular Concrete Shelf',
      price: '$850.00',
      image: 'https://images.unsplash.com/photo-1629854497559-21b0e008b8b0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Hand-poured concrete modules. Infinitely reconfigurable for urban spaces.',
    },
    {
      id: 2,
      name: 'Industrial Steel Console',
      price: '$1200.00',
      image: 'https://images.unsplash.com/photo-1629854497645-03d15d6a2f4c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Welded raw steel frame with a brushed finish. A statement of uncompromising design.',
    },
    {
      id: 3,
      name: 'Deconstructed Lamp Unit',
      price: '$320.00',
      image: 'https://images.unsplash.com/photo-1610416410385-e0c1f6c1f1f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Exposed wiring and raw filament. Illuminates with stark, intentional clarity.',
    },
    {
      id: 4,
      name: 'Textured Wall Panel Set',
      price: '$480.00',
      image: 'https://images.unsplash.com/photo-1629854497871-00d15d6a2f4c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Cast concrete with deep, brutalist textures. Transforms any surface.',
    },
    {
      id: 5,
      name: 'Modular Stacking Stools',
      price: '$180.00',
      image: 'https://images.unsplash.com/photo-1549480106-93d3954f9a72?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Solid wood blocks, unadorned and functional. Perfect for flexible seating.',
    },
    {
      id: 6,
      name: 'Reclaimed Metal Planter',
      price: '$210.00',
      image: 'https://images.unsplash.com/photo-1629854497652-00d15d6a2f4c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Salvaged steel, hand-finished. Each piece carries its own unique history.',
    },
  ];

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="products" className="py-16 md:py-24 px-6 md:px-12 bg-stone-900 text-stone-100 border-b border-stone-700">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold font-['Space_Grotesk'] tracking-tighter mb-12 text-center md:text-left uppercase">
          Current Offerings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              className={`relative bg-stone-800 border-2 border-stone-700
                          ${product.id === 1 ? 'md:col-span-2' : ''}
                          ${product.id === 2 ? 'md:row-span-2 flex flex-col' : ''}
                          ${product.id === 5 ? 'lg:row-span-2 flex flex-col' : ''}
                          overflow-hidden group`}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`w-full object-cover transition-transform duration-300 group-hover:scale-105
                            ${product.id === 2 || product.id === 5 ? 'h-96 md:h-full' : 'h-64 md:h-72'} ${product.id === 1 ? 'md:h-80' : ''}`}
              />
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold font-['Space_Grotesk'] leading-snug mb-2 text-stone-100">
                    {product.name}
                  </h3>
                  <p className="text-xl font-['Space_Mono'] text-red-600 mb-4">{product.price}</p>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => toggleExpand(product.id)}
                    className="flex items-center justify-between w-full bg-stone-700 text-stone-100 px-4 py-3 border border-stone-600
                               hover:bg-stone-600 transition-colors duration-200 hover:opacity-90 cursor-pointer"
                  >
                    <span className="uppercase font-bold font-['Space_Grotesk'] tracking-wider">
                      {expandedCard === product.id ? 'Hide Details' : 'View Details'}
                    </span>
                    {expandedCard === product.id ? <Minus size={20} /> : <Plus size={20} />}
                  </button>

                  {expandedCard === product.id && (
                    <div className="mt-4 border-t border-stone-700 pt-4">
                      <p className="text-stone-300 mb-4 text-sm font-['Space_Mono'] leading-relaxed">{product.description}</p>
                      <button
                        className="flex items-center justify-center w-full bg-red-600 text-stone-100 uppercase font-bold font-['Space_Grotesk'] tracking-wider
                                   py-3 border-2 border-red-600
                                   hover:bg-transparent hover:text-red-600 transition-all duration-300
                                   hover:opacity-90 cursor-pointer"
                      >
                        Add to Cart <ArrowRight className="ml-2" size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}