import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ProcessExplanation() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const processSteps = [
    {
      id: 'step-01',
      title: '01_STRATEGIC_DECONSTRUCTION',
      description: 'We dismantle your current challenges, objectives, and market position. This phase involves rigorous analysis, competitor benchmarking, and stakeholder interviews to uncover the raw essence of your project. We define the core problem, stripped of all assumptions.',
      details: [
        'Detailed Requirement Elicitation',
        'Competitor Analysis & Gap Identification',
        'Target Audience Profiling & Needs Assessment',
        'Initial Risk Assessment & Mitigation Strategy'
      ]
    },
    {
      id: 'step-02',
      title: '02_CONCEPTUAL_ARCHITECTURE',
      description: 'Translating raw insights into a brutalist blueprint. We architect the core functionality and user flow, prioritizing clarity and directness. This is where wireframes emerge as stark structural diagrams, focusing on utility over ornamentation.',
      details: [
        'Low-Fidelity Wireframing & Prototyping',
        'Information Architecture Mapping',
        'Core Feature Definition & Prioritization',
        'Technical Feasibility Assessment'
      ]
    },
    {
      id: 'step-03',
      title: '03_EXECUTIVE_DESIGN_BUILD',
      description: 'The construction phase. We forge the visual and interactive elements, employing heavy typography, stark contrasts, and unapologetic layouts. Our design is functional, robust, and engineered for impact, without superfluous embellishments.',
      details: [
        'High-Fidelity UI Design & Component Development',
        'Interactive Prototyping & User Journey Testing',
        'Frontend Development (HTML, CSS, React)',
        'Iterative Feedback & Refinement Cycles'
      ]
    },
    {
      id: 'step-04',
      title: '04_IMPACT_DEPLOYMENT_POST-MORTEM',
      description: 'Launch and analysis. We deploy the final product with precision, ensuring robust performance. Post-launch, we conduct a thorough analysis of its impact, identifying areas for uncompromising optimization and future iterations.',
      details: [
        'Deployment to Production Environments',
        'Performance Monitoring & Analytics Setup',
        'Post-Launch Review & KPI Measurement',
        'Ongoing Support & Iterative Enhancement Planning'
      ]
    },
  ];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <section id="process" className="border-t-2 border-red-500 pt-20">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-center mb-16 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        Our_Rigorous_Process
      </h2>

      <div className="space-y-6">
        {processSteps.map((step) => (
          <div key={step.id} className="border-2 border-red-500 bg-zinc-900">
            <button
              onClick={() => toggleAccordion(step.id)}
              className="flex justify-between items-center w-full p-6 text-left text-white text-2xl sm:text-3xl font-bold uppercase hover:bg-zinc-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer hover:opacity-90"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              aria-expanded={openAccordion === step.id}
            >
              <span>{step.title}</span>
              {openAccordion === step.id ? (
                <ChevronUp className="w-8 h-8 text-red-500" />
              ) : (
                <ChevronDown className="w-8 h-8 text-red-500" />
              )}
            </button>
            {openAccordion === step.id && (
              <div className="p-6 border-t-2 border-red-500 bg-zinc-900 text-white animate-fade-in-down">
                <p className="mb-4 text-lg">{step.description}</p>
                <ul className="list-disc list-inside space-y-2 text-zinc-300 text-md">
                  {step.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2 text-xl leading-none">&raquo;</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Brutalist Fade-in animation for accordion content */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}