import React from 'react';
import GenerationPanel from './GenerationPanel';

export default function SplitHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pb-24 lg:pt-40">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side: Hero Content */}
        <div className="lg:w-1/2 text-center lg:text-left z-10">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-50 mb-6">
            Unlock Your Creative Potential with Intelligent Generation
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
            CognitoFlow empowers you to generate high-quality content, stunning visuals, and innovative solutions with advanced AI. Streamline your workflow and bring your ideas to life faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="px-8 py-4 bg-blue-400 text-white rounded-full text-lg font-semibold shadow-xl hover:opacity-90 transition-all duration-200 cursor-pointer">
              Start Generating Free
            </button>
            <button className="px-8 py-4 bg-transparent border border-blue-400 text-blue-400 rounded-full text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-200 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        {/* Right side: Generation Panel */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end z-10">
          <GenerationPanel />
        </div>
      </div>

      {/* Background Gradient Effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
}