import React from 'react';

export default function BoldHero() {
  return (
    <section className="flex flex-col items-center py-12">
      <h1 className="text-5xl font-bold mb-4">Build powerful software, faster.</h1>
      <p className="text-lg text-center mb-8">CodeForge helps you streamline your development process with our suite of tools.</p>
      <button className="bg-red-600 text-white px-6 py-3 hover:opacity-90 transition-all duration-200 cursor-pointer">Get Started</button>
    </section>
  );
}