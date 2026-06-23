import React from 'react';
import { Check } from 'lucide-react';

const expertiseAreas = [
  { id: 1, name: "UI/UX Design", description: "Crafting intuitive and visually stunning user interfaces.", icon: Check },
  { id: 2, name: "Branding & Identity", description: "Building compelling brand narratives and visual systems.", icon: Check },
  { id: 3, name: "Web Development", description: "Bringing digital visions to life with clean, efficient code.", icon: Check },
  { id: 4, name: "Prototyping & Animation", description: "Creating interactive prototypes and engaging motion graphics.", icon: Check },
  { id: 5, name: "Digital Strategy", description: "Developing data-driven strategies for online growth.", icon: Check },
  { id: 6, name: "Content Creation", description: "Producing high-quality content across multiple platforms.", icon: Check }
];

export default function ExpertiseShowcase() {
  return (
    <section className="container mx-auto px-6 py-16 lg:py-24">
      <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12">
        Our Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {expertiseAreas.map((area) => (
          <div key={area.id} className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <area.icon className="h-8 w-8 text-teal-600 mr-4" />
              <h3 className="text-2xl font-bold text-neutral-800">
                {area.name}
              </h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              {area.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}