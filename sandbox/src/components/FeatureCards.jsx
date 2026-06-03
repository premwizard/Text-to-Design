import React from 'react';
import { Settings, Shield, Zap, TrendingUp } from 'lucide-react';

export default function FeatureCards() {
  const features = [
    {
      icon: Settings,
      title: 'Customizable Presets',
      description: 'Tailor your dropdowns with a rich set of options and pre-defined configurations for any use case.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with enterprise-grade security, ensuring your selections and data remain protected and private.',
    },
    {
      icon: Zap,
      title: 'Blazing Fast Performance',
      description: 'Experience instant response times and smooth interactions, even with thousands of options.',
    },
    {
      icon: TrendingUp,
      title: 'Analytics Integration',
      description: 'Gain insights into user choices and optimize your application flow with built-in tracking.',
    },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
        Unlock Powerful Selection Capabilities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative p-6 rounded-2xl
                       bg-white/40 backdrop-blur-xl border border-gray-200 shadow-xl
                       hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer
                       flex flex-col items-center text-center"
          >
            <div className="p-4 rounded-full bg-blue-600 text-white mb-6">
              <feature.icon size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}