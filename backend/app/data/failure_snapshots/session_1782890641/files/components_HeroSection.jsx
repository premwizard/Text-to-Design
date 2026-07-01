import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-white text-zinc-900 py-24 sm:py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-white opacity-50 z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
          Streamline your workflow with <br className="hidden sm:inline" /> intelligent automation.
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 max-w-3xl mx-auto mb-10 animate-fade-in-up delay-200">
          ApexFlow empowers your team to automate repetitive tasks, optimize processes, and gain valuable insights, so you can focus on what truly matters.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-400">
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-zinc-600 hover:bg-zinc-700 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
          >
            Learn More
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-3 border border-zinc-300 text-base font-medium rounded-md text-zinc-900 bg-white hover:bg-zinc-50 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
          >
            See Pricing
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;