import React from 'react';
import { Zap, LayoutGrid, BarChart2, ShieldCheck, Cloud, Settings } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Automated Workflows',
    description: 'Design and deploy automated processes that handle repetitive tasks, freeing up your team for strategic work.',
  },
  {
    icon: LayoutGrid,
    title: 'Seamless Integrations',
    description: 'Connect all your essential tools and platforms with our extensive library of integrations, creating a unified ecosystem.',
  },
  {
    icon: BarChart2,
    title: 'Advanced Analytics',
    description: 'Gain deep insights into your operations with powerful, customizable dashboards and real-time data visualization.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-Grade Security',
    description: 'Your data is protected with industry-leading security protocols, encryption, and compliance standards.',
  },
  {
    icon: Cloud,
    title: 'Scalable Cloud Infrastructure',
    description: 'Grow without limits. Our cloud-native platform scales automatically to meet your demands, big or small.',
  },
  {
    icon: Settings,
    title: 'Customizable Solutions',
    description: 'Tailor SynapseFlow to your unique business needs with flexible configurations and custom development options.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 leading-tight">
          Unlock the Power of Automation
        </h2>
        <p className="text-xl text-center text-zinc-700 mb-12 max-w-2xl mx-auto">
          Discover how SynapseFlow can transform your business operations with intelligent, efficient, and secure automation solutions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-50 p-8 rounded-md flex flex-col items-start text-left group hover:bg-zinc-100 transition-all duration-300 ease-in-out"
            >
              <div className="p-4 bg-zinc-200 rounded-full mb-6 group-hover:bg-zinc-700 group-hover:text-white transition-colors duration-300 ease-in-out">
                <feature.icon size={32} className="text-zinc-700 group-hover:text-white transition-colors duration-300 ease-in-out" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-zinc-900 group-hover:text-zinc-800 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-zinc-700 leading-relaxed group-hover:text-zinc-800 transition-colors duration-300">
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