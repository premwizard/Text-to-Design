import React from 'react';

export default function GradientHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-500 opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-500 opacity-40 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-8 lg:px-20 py-24 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-100">
            LuminaFlow: <span className="text-cyan-500">Effortless</span> data orchestration for modern businesses.
          </h1>
          <p className="text-xl lg:text-2xl mb-10 text-gray-300">
            Streamline your data pipelines, unlock insights, and accelerate growth with our intuitive and powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/40">Get Started</button>
            <button className="border-2 border-cyan-500 text-cyan-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-500 hover:text-white transition-all duration-300">Request Demo</button>
          </div>
        </div>
        <div className="lg:w-1/2 relative hidden lg:block">
          {/* Visual element to complement the gradient, e.g., abstract shapes or data visualization */}
          <div className="relative w-full h-96 transform scale-110">
             <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg blur-xl opacity-60"></div>
             <div className="absolute -inset-0.5 bg-zinc-900 rounded-lg"></div>
             <div className="absolute inset-2 bg-gradient-to-tl from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-center p-8">
               <p className="text-gray-200 text-lg font-medium">Visualizing the flow of complex data, simplified.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}