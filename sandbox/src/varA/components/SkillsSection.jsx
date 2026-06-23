import React from 'react';
import { Star } from 'lucide-react';

export default function SkillsSection() {
  const skills = [
    { name: "Brand Strategy", icon: Star, proficiency: 5 },
    { name: "Visual Identity Design", icon: Star, proficiency: 5 },
    { name: "Editorial Design", icon: Star, proficiency: 4 },
    { name: "Web Design & UI/UX", icon: Star, proficiency: 4 },
    { name: "Content Creation", icon: Star, proficiency: 3 },
    { name: "Art Direction", icon: Star, proficiency: 5 }
  ];

  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skills.map((skill, index) => (
            <div key={index} className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-pink-500 mb-4">
                <skill.icon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-gray-800">{skill.name}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">Leveraging years of experience to craft compelling narratives.</p>
              <div className="mt-4 flex justify-center">
                {[...Array(skill.proficiency)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-pink-500 fill-current" />
                ))}
                {[...Array(5 - skill.proficiency)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-300" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}