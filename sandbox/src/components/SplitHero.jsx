import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function SplitHero() {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-[90vh] px-4 py-20 lg:py-0 pt-32 lg:pt-0 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-screen-xl mx-auto gap-12 lg:gap-8 xl:gap-16">
        {/* Left Section - Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-8 lg:pr-8 animate-fade-in-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-50 font-space-grotesk">
            Unleash your creativity with intelligent generation.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-inter max-w-2xl mx-auto lg:mx-0">
            SynthAI empowers artists, designers, and innovators to transform ideas into stunning visuals and engaging content with the power of advanced AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="flex items-center justify-center px-8 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:opacity-90 transition-all duration-200 cursor-pointer group">
              Start Generating <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="flex items-center justify-center px-8 py-3 border border-gray-400 text-gray-200 rounded-full text-lg font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-200 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section - Visual Preview */}
        <div className="flex-1 flex justify-center lg:justify-end animate-fade-in-right">
          <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl shadow-2xl backdrop-blur-md border border-white/20 p-6 flex items-center justify-center overflow-hidden">
            {/* Glassmorphic border effect on image */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center p-2">
              <img
                src="https://source.unsplash.com/random/800x600/?abstract-ai-art,digital-art" 
                alt="AI Generated Art Preview"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-xl">
                <Sparkles className="text-blue-500" size={48} />
              </div>
            </div>

            {/* Floating elements for glassmorphism */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-500/30 blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-purple-500/30 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}