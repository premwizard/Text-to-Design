import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function WorkCollage() {
  const projects = [
    {
      id: 1,
      title: 'Project_Quantum_Leap',
      description: 'Revolutionizing data visualization for deep-tech analytics. A stark, functional interface designed for maximum information density and minimal distraction.',
      tags: ['WEB_APP', 'DATA_VIS', 'UX/UI'],
      year: '2023',
    },
    {
      id: 2,
      title: 'Campaign_Ares_Launch',
      description: 'A high-impact landing page system for a B2B SaaS product launch. Aggressive typography and direct calls-to-action drove a 30% conversion uplift.',
      tags: ['LANDING_PAGE', 'MARKETING', 'BRANDING'],
      year: '2022',
    },
    {
      id: 3,
      title: 'System_Echo_Identity',
      description: 'Comprehensive brand identity and digital presence for an industrial automation startup. Focused on raw functionality and robust communication.',
      tags: ['BRAND_IDENTITY', 'WEB_DEV', 'STRATEGY'],
      year: '2021',
    },
    {
      id: 4,
      title: 'Interface_Sentinel_V1',
      description: 'Developing a secure, modular user interface for a security protocol management system. Emphasizes clarity and operational integrity.',
      tags: ['PRODUCT_DESIGN', 'SAAS', 'FRONTEND'],
      year: '2023',
    },
  ];

  return (
    <section id="work" className="border-t-2 border-red-500 pt-20">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-center mb-16 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        Selected_Work_Archive
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project) => (
          <div key={project.id} className="bg-zinc-900 p-8 border-4 border-red-500 group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-700">
            <div className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            <p className="text-sm text-zinc-400 mb-2 uppercase">{project.year}</p>
            <h3 className="text-3xl font-bold uppercase text-white mb-4 leading-snug" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {project.title}
            </h3>
            <p className="text-white mb-6 text-lg">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag, index) => (
                <span key={index} className="bg-zinc-800 text-red-500 text-xs font-bold px-3 py-1 border border-red-500 uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <a href="#" className="flex items-center text-red-500 text-xl font-bold uppercase group-hover:underline transition-all duration-200 cursor-pointer hover:opacity-90">
              View_Project <ArrowRight className="ml-2 w-6 h-6" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}