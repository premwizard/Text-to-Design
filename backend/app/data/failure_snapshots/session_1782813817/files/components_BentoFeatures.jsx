import React from 'react';
import { Monitor, Zap, Palette, Cloud, Shield, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Monitor,
    title: 'Intuitive Dashboard',
    description: 'Manage all your projects and assets from a single, streamlined interface designed for clarity.',
  },
  {
    icon: Palette,
    title: 'Advanced Customization',
    description: 'Tailor every detail to your brand with powerful and flexible design controls.',
  },
  {
    icon: Zap,
    title: 'Blazing Fast Performance',
    description: 'Experience lightning-speed loading times and seamless operations, always.',
  },
  {
    icon: Cloud,
    title: 'Seamless Cloud Integration',
    description: 'Sync your work across devices and collaborate effortlessly with cloud-based solutions.',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'Your data is protected with industry-leading security protocols and continuous monitoring.',
  },
  {
    icon: Lightbulb,
    title: 'AI-Powered Insights',
    description: 'Gain valuable insights and automate tasks with intelligent AI assistants.',
  },
];

const BentoFeatures = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-36 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-zinc-100 mb-16 font-space-grotesk leading-tight">
          Unlock the Future of Creation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-slate-900 border border-gray-800 rounded-xl p-8 flex flex-col items-start space-y-6 shadow-xl
                         hover:border-indigo-500 transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]"
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-semibold text-zinc-100 font-space-grotesk">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {feature.description}
              </p>
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 font-medium text-lg flex items-center gap-2 transition-colors duration-300 group-hover:gap-3"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right transform group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;