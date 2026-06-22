import React, { useState } from 'react';
import { Check, Star, X } from 'lucide-react';

const features = [
  {
    title: "Project Management",
    description: "Organize tasks, track progress, and manage deadlines with intuitive boards and timelines.",
    icon: Star,
    color: "bg-blue-500",
    span: "row-span-1"
  },
  {
    title: "Team Collaboration",
    description: "Communicate seamlessly with integrated chat, video calls, and shared document editing.",
    icon: Check,
    color: "bg-green-500",
    span: "row-span-1"
  },
  {
    title: "Document Hub",
    description: "Create, store, and access all your project documents in a centralized, searchable repository.",
    icon: Check,
    color: "bg-purple-500",
    span: "row-span-2"
  },
  {
    title: "Analytics Dashboard",
    description: "Gain insights into team performance and project status with customizable dashboards.",
    icon: Star,
    color: "bg-yellow-500",
    span: "row-span-1"
  },
  {
    title: "Integrations",
    description: "Connect with your favorite tools like Slack, Google Drive, and GitHub seamlessly.",
    icon: Check,
    color: "bg-indigo-500",
    span: "row-span-1"
  },
  {
    title: "Custom Workflows",
    description: "Automate repetitive tasks and build custom workflows tailored to your team's needs.",
    icon: Star,
    color: "bg-red-500",
    span: "row-span-2"
  },
];

export default function BentoFeatures() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features, Effortless Workflow</h2>
          <p className="text-lg text-gray-600">Discover how SynergyHub empowers your team to do their best work.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className={`relative p-6 rounded-3xl shadow-clay-lg cursor-pointer transition-all duration-300 ease-in-out ${feature.span} ${feature.color} ${isExpanded ? 'col-span-2 row-span-2' : ''}`}
                onClick={() => toggleExpand(index)}
              >
                <div className={`p-3 rounded-xl mb-4 inline-block ${feature.color === 'bg-blue-500' ? 'bg-white/20' : 'bg-white/40'} backdrop-blur-sm`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 text-white ${isExpanded ? 'text-3xl' : ''}`}>
                  {feature.title}
                </h3>
                <p className={`text-white text-opacity-80 transition-all duration-300 ${isExpanded ? 'text-lg block' : 'h-0 hidden'}`}>
                  {feature.description}
                </p>
                {!isExpanded && (
                  <p className="text-white text-opacity-70 text-sm absolute bottom-6 right-6">
                    Click to expand
                  </p>
                )}
                {isExpanded && (
                  <button className="absolute bottom-6 right-6 bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer">
                    Learn More
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}