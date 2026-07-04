import React from 'react';

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16 lg:gap-20">
        <div className="text-slate-900 space-y-6 md:space-y-8 lg:space-y-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Unlocking Insights, <span className="text-blue-600">Amplifying Success</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl lg:text-2xl leading-relaxed">
            Discover the power of data with TechPulse. We provide cutting-edge solutions to transform your business operations and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg">
              Get Started
            </button>
            <button className="bg-white border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg">
              Learn More
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <img
            src="https://via.placeholder.com/600x450/60a5fa/ffffff?text=TechPulse+Hero"
            alt="Abstract data visualization"
            className="w-full max-w-md lg:max-w-lg h-auto object-cover rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;