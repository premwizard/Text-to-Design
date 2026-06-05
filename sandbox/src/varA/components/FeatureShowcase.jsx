import React from 'react';
import { Rocket, Lightbulb, TrendingUp, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function FeatureShowcase() {
  const features = [
    {
      icon: Rocket,
      title: 'Accelerate Productivity',
      description: 'Automate repetitive tasks and focus on what truly matters, boosting your team\'s output instantly.',
    },
    {
      icon: Lightbulb,
      title: 'Gain Actionable Insights',
      description: 'Visualize project progress and team performance with intuitive dashboards and real-time analytics.',
    },
    {
      icon: TrendingUp,
      title: 'Optimize Resource Allocation',
      description: 'Identify bottlenecks and reallocate resources effectively to ensure every project stays on track and within budget.',
    },
    {
      icon: ShieldCheck,
      title: 'Ensure Data Security',
      description: 'Protect your sensitive information with enterprise-grade security protocols and compliance measures.',
    },
    {
      icon: Zap,
      title: 'Seamless Integrations',
      description: 'Connect with your favorite tools like Slack, Jira, and Salesforce effortlessly to create a unified ecosystem.',
    },
    {
      icon: Globe,
      title: 'Global Collaboration',
      description: 'Facilitate smooth communication and collaboration across distributed teams, no matter where they are.',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-500 blur-[120px] top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Unlock Peak Performance with OrbitFlow
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
          Transform the way your team works. Discover features designed to enhance every aspect of your operations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="bg-cyan-500/20 text-cyan-500 p-3 rounded-full inline-flex mb-6 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-space-grotesk text-2xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}