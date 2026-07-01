import React from 'react';
import { Lightbulb, Workflow, BarChart2, ShieldCheck, Zap, Cloud } from 'lucide-react';

const features = [
  {
    icon: <Workflow size={32} className="text-zinc-600" />,
    title: 'Automated Workflows',
    description: 'Design and deploy powerful automation sequences that handle routine tasks effortlessly, freeing up your team.',
  },
  {
    icon: <BarChart2 size={32} className="text-zinc-600" />,
    title: 'Advanced Analytics',
    description: 'Gain deep insights into your operations with comprehensive dashboards and real-time reporting features.',
  },
  {
    icon: <Lightbulb size={32} className="text-zinc-600" />,
    title: 'Smart Recommendations',
    description: 'Leverage AI-driven suggestions to optimize processes and make data-informed decisions for better outcomes.',
  },
  {
    icon: <ShieldCheck size={32} className="text-zinc-600" />,
    title: 'Enterprise-Grade Security',
    description: 'Your data is protected with industry-leading security protocols and compliance standards.',
  },
  {
    icon: <Zap size={32} className="text-zinc-600" />,
    title: 'Blazing Fast Performance',
    description: 'Experience lightning-fast processing speeds and seamless operations, even with high volumes of data.',
  },
  {
    icon: <Cloud size={32} className="text-zinc-600" />,
    title: 'Scalable Cloud Infrastructure',
    description: 'Our cloud-native platform scales with your business, ensuring reliability and flexibility as you grow.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-zinc-50 text-zinc-900 py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Unleash Your Team's Potential
          </h2>
          <p className="text-lg text-zinc-700 max-w-2xl mx-auto">
            ApexFlow provides a suite of powerful features designed to transform the way you work, boosting efficiency and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-md flex flex-col items-start text-left transition-transform duration-300 hover:scale-[1.02] hover:bg-zinc-50"
            >
              <div className="mb-4 p-3 rounded-full bg-zinc-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;