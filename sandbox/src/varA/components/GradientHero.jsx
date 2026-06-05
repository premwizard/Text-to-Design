import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export default function GradientHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-48 text-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute w-96 h-96 rounded-full bg-cyan-500 blur-[150px] top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-96 h-96 rounded-full bg-indigo-500 blur-[150px] bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-space-grotesk text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white mb-6 animate-fade-in-up">
          Streamline your workflows, amplify your impact.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-100">
          OrbitFlow empowers teams to connect, automate, and optimize every process, turning complexity into clarity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-200">
          <button className="bg-cyan-500 text-white px-8 py-3 rounded-full font-semibold text-lg flex items-center justify-center hover:opacity-90 transition-all duration-200 cursor-pointer shadow-lg shadow-cyan-500/30">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="border border-white/20 text-gray-200 px-8 py-3 rounded-full font-semibold text-lg flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-md">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </button>
        </div>

        {/* Optional: Glassmorphic element showcasing the product indirectly */}
        <div className="mt-20 relative w-full h-80 md:h-96 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-center overflow-hidden shadow-2xl animate-fade-in-up delay-300">
          <div className="absolute w-64 h-64 rounded-full bg-cyan-400 opacity-10 blur-3xl -top-10 -left-10"></div>
          <div className="absolute w-64 h-64 rounded-full bg-indigo-400 opacity-10 blur-3xl -bottom-10 -right-10"></div>
          <p className="text-gray-400 italic text-lg md:text-xl">"Revolutionizing team collaboration..."</p>
          <div className="absolute bottom-4 right-4 text-xs text-gray-500">Product UI Placeholder</div>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}