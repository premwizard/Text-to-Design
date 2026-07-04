import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-white to-zinc-50">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-zinc-900">
          Streamline Your Workflow with Intelligent Automation.
        </h1>
        <p className="text-lg md:text-xl text-zinc-700 mb-10 max-w-3xl mx-auto">
          SynapseFlow empowers your team to automate repetitive tasks, integrate disparate systems, and gain real-time insights for smarter decision-making.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-zinc-700 to-zinc-900 text-white font-semibold rounded-md hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300 ease-in-out flex items-center justify-center group">
            Start Your Free Trial
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-3 bg-white border border-zinc-300 text-zinc-700 font-semibold rounded-md hover:bg-zinc-50 hover:border-zinc-400 transition-colors duration-300 ease-in-out">
            Learn More
          </button>
        </div>

        {/* Optional: Placeholder for an illustration or animation */}
        <div className="mt-16 md:mt-24 relative">
          <div className="relative w-full max-w-4xl mx-auto h-64 md:h-96 bg-zinc-100 rounded-md overflow-hidden flex items-center justify-center border border-zinc-200">
            <span className="text-zinc-400 text-lg md:text-2xl">Visual Workflow Illustration Placeholder</span>
            {/* Example of subtle gradient overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50 opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;