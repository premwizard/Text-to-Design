import React, { useState, useEffect } from 'react';

const DynamicHero = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-80 blur-2xl transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(147,36,140,0.5) 0%, rgba(76,29,143,0.8) 60%, rgba(17,24,39,1) 100%)',
        }}
      ></div>
      <div
        className={`relative z-10 text-center p-8 md:p-16 transition-all duration-1000 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-fuchsia-400 leading-tight drop-shadow-lg">
          Vivid Spectra Artistry
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
          "Crafting vibrant visual narratives."
        </p>
        <button className="px-8 py-3 bg-fuchsia-500 text-white font-semibold rounded-lg shadow-lg hover:bg-fuchsia-600 hover:opacity-90 transition-all duration-200 cursor-pointer">
          View Portfolio
        </button>
      </div>
    </section>
  );
};

export default DynamicHero;