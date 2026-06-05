import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function SplitScreenHeroWithAnimation() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background Gradients */}
      <div
        className="absolute inset-0 z-0 opacity-40 animate-gradient-shift"
        style={{
          background: `linear-gradient(45deg, #0f172a, #1a202c, #0d3b66, #2d3748, #0f172a)`,
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite',
        }}
      ></div>
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Content */}
        <div className="lg:w-1/2 text-center lg:text-left animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-100 mb-6 leading-tight">
            Seamless Transactions, <br className="hidden md:block"/> Infinite Possibilities.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg lg:max-w-xl mx-auto lg:mx-0">
            ChronoPay empowers businesses with lightning-fast, secure, and globally accessible payment solutions.
            Future-proof your finances with our cutting-edge platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-xl text-lg font-semibold hover:bg-blue-600 transition-all duration-300 cursor-pointer shadow-lg">
              Get Started Free <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="flex items-center justify-center px-8 py-4 border border-blue-500 text-blue-500 rounded-xl text-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer shadow-lg">
              Explore Features
            </button>
          </div>
        </div>

        {/* Right Side: Visual (Placeholder for a complex animation/illustration) */}
        <div className="lg:w-1/2 flex justify-center items-center relative min-h-[300px] lg:min-h-[500px] mt-12 lg:mt-0">
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl animate-pulse-light">
            {/* Animated glowing border/gradient for visual appeal */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-pink-500 opacity-30 blur-2xl animate-pulse-fade"></div>
            <div className="absolute inset-0 bg-zinc-800 rounded-3xl border border-blue-700/50 flex items-center justify-center p-8">
              {/* Placeholder for a cool, dark-tech diagram or animation */}
              <div className="text-gray-400 text-center text-sm italic">
                <p>Advanced transaction flows visualized.</p>
                <p>Real-time data streams and security protocols.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}