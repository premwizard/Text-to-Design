import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden text-center py-20 md:py-32 lg:py-48 bg-gradient-to-br from-zinc-950 to-zinc-900">
      {/* Abstract background elements for premium feel */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-zinc-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6
                       text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500">
          Unlock Your Potential with Seamless Digital Experiences.
        </h1>
        <p className="text-zinc-300 max-w-4xl mx-auto text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed">
          AetherFlow empowers businesses and individuals to thrive in the digital age with innovative solutions, intuitive platforms, and unparalleled support.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-10 rounded-xl shadow-lg hover:shadow-xl
                             transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             text-lg md:text-xl">
            Learn More
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 hover:border-zinc-600
                             font-medium py-3.5 px-10 rounded-xl shadow-md hover:shadow-lg
                             transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             text-lg md:text-xl">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;