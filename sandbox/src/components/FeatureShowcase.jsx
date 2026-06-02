import React from 'react';
import { Zap, Brain, Globe, ShieldCheck, TrendingUp, Monitor } from 'lucide-react';

export default function FeatureShowcase() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Models',
      description: 'Leverage the latest in generative AI, powered by cutting-edge neural networks for unparalleled output quality.',
      image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=AI+Brain'
    },
    {
      icon: Globe,
      title: 'Multi-Modal Generation',
      description: 'Generate text, images, code, and even audio from a single platform. Create diverse content effortlessly.',
      image: 'https://via.placeholder.com/600x400/6366f1/ffffff?text=Multi-Modal'
    },
    {
      icon: Zap,
      title: 'Lightning-Fast Results',
      description: 'Experience instant generation with optimized algorithms, reducing your wait time and boosting productivity.',
      image: 'https://via.placeholder.com/600x400/a855f7/ffffff?text=Fast+Results'
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Private Workflows',
      description: 'Your data and generated content are protected with enterprise-grade security and strict privacy protocols.',
      image: 'https://via.placeholder.com/600x400/ec4899/ffffff?text=Security'
    },
    {
      icon: TrendingUp,
      title: 'Optimized for SEO & Engagement',
      description: 'AI-generated content is crafted to rank higher and capture audience attention, driving better performance.',
      image: 'https://via.placeholder.com/600x400/ef4444/ffffff?text=SEO+Optimization'
    },
    {
      icon: Monitor,
      title: 'Intuitive Creative Studio',
      description: 'A user-friendly interface designed for creators of all levels to easily manage, edit, and export their generated assets.',
      image: 'https://via.placeholder.com/600x400/f59e0b/ffffff?text=Creative+Studio'
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-zinc-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-50 mb-6">
          Powerful Features to Fuel Your Vision
        </h2>
        <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-16">
          CognitoFlow integrates cutting-edge AI capabilities into a seamless, intuitive platform, designed to elevate your creative and professional output.
        </p>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16
                ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Feature Image/Visual */}
              <div className="lg:w-1/2 relative bg-zinc-800 bg-opacity-40 border border-zinc-700/60 rounded-3xl p-6 shadow-xl backdrop-blur-lg group transform hover:scale-[1.01] transition-all duration-300">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto rounded-2xl object-cover transform group-hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-transparent to-transparent rounded-2xl"></div>
              </div>

              {/* Feature Content */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-blue-400 mb-4">
                  <feature.icon size={36} className="mr-4" />
                  <h3 className="text-3xl font-bold text-gray-50">{feature.title}</h3>
                </div>
                <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {feature.description}
                </p>
                <button className="mt-8 px-7 py-3 bg-blue-400 text-white rounded-full font-medium shadow-md hover:opacity-90 transition-all duration-200 cursor-pointer">
                  Explore {feature.title.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}