import React from 'react';
import { Layout, Palette, Code, Users } from 'lucide-react';

const skillPillars = [
  {
    icon: Palette,
    title: 'Creative Design',
    description: 'Crafting visually stunning and intuitive user interfaces that captivate and delight.',
    skills: [
      'UI/UX Prototyping (Figma, Adobe XD)',
      'Graphic Design (Illustrator, Photoshop)',
      'Brand Identity & Guidelines',
      'Wireframing & User Flows',
    ],
  },
  {
    icon: Code,
    title: 'Frontend Development',
    description: 'Bringing designs to life with clean, responsive, and performant code.',
    skills: [
      'React, Next.js, Vue.js',
      'Tailwind CSS, SCSS, Styled Components',
      'JavaScript (ES6+), TypeScript',
      'API Integration & State Management',
    ],
  },
  {
    icon: Layout,
    title: 'Backend & Architecture',
    description: 'Building robust, scalable, and secure server-side applications and APIs.',
    skills: [
      'Node.js (Express), Python (Django, Flask)',
      'Database Management (PostgreSQL, MongoDB)',
      'RESTful API Development',
      'Cloud Deployment (AWS, Vercel, Netlify)',
    ],
  },
  {
    icon: Users,
    title: 'Project Management',
    description: 'Guiding projects from concept to completion with clear communication and efficiency.',
    skills: [
      'Agile & Scrum Methodologies',
      'Client Communication & Collaboration',
      'Requirements Gathering & Analysis',
      'Quality Assurance & Testing',
    ],
  },
];

export default function SkillPillars() {
  return (
    <section id="skills" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16"
            style={{ fontFamily: 'Playfair Display, serif' }}>
          Our Core Expertise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {skillPillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full bg-indigo-100 text-indigo-700 mb-6">
                <pillar.icon size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {pillar.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {pillar.description}
              </p>
              <ul className="text-gray-700 space-y-2 list-none p-0 flex-grow">
                {pillar.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center justify-center text-base">
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-700 mr-3"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}