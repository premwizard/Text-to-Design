import React, { useState } from 'react';

const features = [
  {
    title: "Automated Data Ingestion",
    description: "Connect to any data source – databases, APIs, files – and let LuminaFlow handle the rest. Real-time or batch, we've got you covered.",
    icon: "database",
    color: "blue"
  },
  {
    title: "Intelligent Transformation",
    description: "Clean, enrich, and transform your data with our visual pipeline builder. No coding required for common tasks.",
    icon: "wand-sparkles",
    color: "purple"
  },
  {
    title: "Scalable Orchestration",
    description: "Manage complex workflows with ease. Our distributed architecture ensures high availability and performance, no matter the scale.",
    icon: "git-branch",
    color: "pink"
  },
  {
    title: "Real-time Monitoring",
    description: "Track your data pipelines' health and performance with live dashboards and instant alerts. Stay ahead of issues.",
    icon: "monitor-waveform",
    color: "yellow"
  },
  {
    title: "Secure Access Control",
    description: "Define granular permissions to ensure your data is only accessed by authorized personnel.",
    icon: "shield-check",
    color: "green"
  }
];

export default function FeatureTimeline() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="py-24 bg-zinc-900/50">
      <div className="container mx-auto px-8 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-100">Unlock Your Data's Potential</h2>
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start relative py-10">
          
          {/* Timeline Connector */} 
          <div className="hidden lg:block lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-px lg:h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 lg:rounded-full lg:shadow-xl lg:shadow-cyan-500/20"></div>

          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8 lg:pr-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`relative p-6 rounded-lg border border-zinc-700 hover:border-cyan-500 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg ${activeFeature === index ? 'bg-zinc-800 border-cyan-500 shadow-xl' : 'bg-zinc-850/50'}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`p-3 rounded-full mb-4 inline-block bg-${feature.color}-500/20 text-cyan-500`}>
                  {/* Placeholder for icons - replace with actual Lucide icons */} 
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L5 14h3v7l8-11h-3z"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description.substring(0, 80)}...</p>
              </div>
            ))}
          </div>

          <div className="lg:w-1/2 lg:pl-16 mt-12 lg:mt-0 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
              <div className="absolute inset-2 bg-zinc-850 rounded-xl p-8 flex flex-col justify-center items-center text-center">
                 <h3 className="text-3xl font-bold mb-4 text-cyan-500">{features[activeFeature].title}</h3>
                 <p className="text-lg text-gray-300 leading-relaxed">
                   {features[activeFeature].description}
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}