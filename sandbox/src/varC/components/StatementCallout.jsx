import React from 'react';

export default function StatementCallout() {
  return (
    <section className="bg-red-600 text-stone-900 py-16 md:py-28 px-6 md:px-12 border-y-4 border-stone-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-['Space_Grotesk'] leading-tight tracking-tighter mb-8 max-w-4xl mx-auto">
          DESIGNED FOR ENDURANCE. BUILT FOR PURPOSE.
        </h2>
        <p className="text-lg sm:text-xl font-['Space_Mono'] leading-relaxed max-w-3xl mx-auto mb-10">
          We reject the ephemeral. Our pieces are not merely objects, but steadfast statements.
          Crafted with integrity, they withstand the test of time, both in form and function.
        </p>
        <a
          href="#about"
          className="inline-block bg-stone-900 text-red-600 uppercase text-lg sm:text-xl font-bold font-['Space_Grotesk'] tracking-wider
                     py-4 px-8 border-2 border-stone-900
                     hover:bg-transparent hover:text-stone-900 transition-all duration-300
                     hover:opacity-90 cursor-pointer"
        >
          Our Philosophy
        </a>
      </div>
    </section>
  );
}