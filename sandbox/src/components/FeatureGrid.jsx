import React from 'react';
import { ImagePlus, PenTool, Lightbulb, Zap, Share2, Cog } from 'lucide-react';

export default function FeatureGrid() {
  const features = [
    {
      icon: ImagePlus,
      title: 'Image Synthesis Pro',
      description: 'Generate hyper-realistic images from text descriptions with unparalleled detail and style consistency.'
    },
    {
      icon: PenTool,
      title: 'Vector Art Generation',
      description: 'Transform concepts into scalable vector graphics, perfect for logos, icons, and illustrations.'
    },
    {
      icon: Lightbulb,
      title: 'Creative Idea Sparker',
      description: 'Overcome creative blocks with AI-driven suggestions for themes, styles, and compositional elements.'
    },
    {
      icon: Zap,
      title: 'Real-time Iteration',
      description: 'Experiment with various prompts and parameters and see instant visual feedback for rapid development.'
    },
    {
      icon: Share2,
      title: 'Seamless Collaboration',
      description: 'Share your generated assets with team members, get feedback, and manage versions efficiently.'
    },
    {
      icon: Cog,
      title: 'Advanced Customization',
      description: 'Fine-tune AI models with your own datasets to achieve a unique and consistent brand aesthetic.'
    },
  ];

  return (
    <section id="features" className="py-20 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4 font-space-grotesk">Unleash Endless Possibilities</h2>
        <p className="text-lg text-gray-300 font-inter max-w-3xl mx-auto">Explore the powerful capabilities of SynthAI designed to elevate your creative workflow and bring your visions to life with cutting-edge technology.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative group backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-8 flex flex-col items-start text-left shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
          >
            {/* Floating accent elements for glassmorphism */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500 animation-delay-300"></div>

            <div className="relative z-10 p-3 bg-blue-500/20 rounded-full mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
              <feature.icon className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-50 mb-3 font-space-grotesk">{feature.title}</h3>
            <p className="text-gray-300 font-inter leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}