import React from 'react';

export default function MagazineHero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gray-900">
              Artisan AI
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 text-gray-700">
              Intelligent design assistance for creators.
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-600">
              Elevate your creative process with AI-powered tools designed to streamline workflows, spark inspiration, and bring your visions to life faster and more beautifully than ever before.
            </p>
            <div className="flex space-x-4">
              <button className="bg-pink-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer">
                Get Started
              </button>
              <button className="text-pink-500 border-2 border-pink-500 px-8 py-3 rounded-md text-lg font-semibold hover:bg-pink-50 hover:opacity-90 transition-all duration-200 cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1517245386804-7ce173b81f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Hero Image"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 opacity-30 -z-1"></div>
    </section>
  );
}