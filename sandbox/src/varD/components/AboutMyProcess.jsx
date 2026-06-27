import React, { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const processSteps = [
  { title: "Discovery & Ideation", description: "Deep diving into your vision, exploring concepts, and laying the groundwork for creative synergy.", details: ["Client Consultation", "Mood Boarding", "Concept Sketching"] },
  { title: "Design & Development", description: "Translating ideas into stunning visuals using cutting-edge techniques and aesthetic principles.", details: ["Wireframing", "Prototyping", "Interactive Elements", "Gradient Mastery"] },
  { title: "Refinement & Delivery", description: "Polishing every detail to ensure a flawless final product that resonates and captivates.", details: ["Client Feedback Loop", "Performance Optimization", "Final Asset Delivery"] }
];

const AboutMyProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background: 'linear-gradient(135deg, rgba(17,24,39,0.8) 0%, rgba(76,29,143,0.5) 50%, rgba(147,36,140,0.4) 100%)',
        }}
      ></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-fuchsia-400 drop-shadow-lg">About My Creative Process</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">My approach is a blend of meticulous planning and spontaneous creativity, ensuring every project is unique, engaging, and visually spectacular. I thrive on transforming abstract concepts into tangible, breathtaking experiences.</p>
            <div className="flex flex-wrap gap-4">
              {processSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ease-in-out ${activeStep === index ? 'bg-fuchsia-500 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </div>
          <div className={`lg:w-1/2 transition-all duration-700 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-3xl font-bold mb-4 text-fuchsia-400 drop-shadow-lg">{processSteps[activeStep].title}</h3>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">{processSteps[activeStep].description}</p>
            <ul className="space-y-3">
              {processSteps[activeStep].details.map((detail, idx) => (
                <li key={idx} className="flex items-center text-slate-300">
                  <Check size={20} className="text-fuchsia-500 mr-3" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMyProcess;