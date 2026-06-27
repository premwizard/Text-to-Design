import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-zinc-900 text-zinc-300 font-dm-sans">
      {/* Background Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl -z-10">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-zinc-800 to-zinc-950 opacity-50"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 71.5%, 100% 27.9%, 51.9% 100%, 30.5% 91.5%, 15.6% 60.1%, 73.6% 51.7%)',
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Aura Creative
            <span className="text-zinc-400">
              {' '}
              - Showcasing Innovation, Crafting Brilliance.
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            We transform bold ideas into stunning digital realities. Specializing in
            bespoke web development, captivating UI/UX design, and cutting-edge
            branding.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#services"
              className="rounded-md bg-zinc-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 transition-colors duration-300"
            >
              Our Services
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold leading-6 text-zinc-300 hover:text-white transition-colors duration-300"
            >
              Let's Talk <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;