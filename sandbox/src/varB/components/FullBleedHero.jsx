import React from 'react';

export default function FullBleedHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1596464525867-b5003c26027a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="High fashion model in an artistic setting"
          className="w-full h-full object-cover brightness-[.85]"
        />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-['Playfair_Display'] text-white leading-tight mb-6 animate-fade-in-up">
          Discover the artistry of independent design.
        </h1>
        <p className="text-xl md:text-2xl text-white mb-10 font-light opacity-0 animate-fade-in-up animation-delay-500">
          Curated collections for the discerning individual.
        </p>
        <button className="px-10 py-4 bg-neutral-900 text-white text-lg tracking-wider uppercase font-medium
                           hover:opacity-90 transition-all duration-200 cursor-pointer opacity-0 animate-fade-in-up animation-delay-1000">
          Explore Collections
        </button>
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}