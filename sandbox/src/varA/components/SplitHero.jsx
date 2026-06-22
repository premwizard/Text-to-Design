import React from 'react';

export default function SplitHero() {
  return (
    <section className="flex flex-col lg:flex-row justify-center items-center min-h-screen py-12 lg:py-24">
      <div className="lg:w-1/2 flex justify-center items-center py-12 lg:py-0 lg:pr-12">
        <img src="https://picsum.photos/200/300" alt="Hero Image" className="w-full lg:w-3/4 h-auto object-cover rounded-lg shadow-lg"/>
      </div>
      <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start py-12 lg:py-0 lg:pl-12 text-center lg:text-left">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">Transform Your Workflow</h1>
        <p className="text-lg lg:text-2xl mb-8">NexaHub helps businesses streamline their operations and boosts productivity with our cutting-edge technology.</p>
        <button className="bg-indigo-500 hover:opacity-90 transition-all duration-200 cursor-pointer py-4 px-8 rounded-full text-lg text-zinc-100">Get Started</button>
      </div>
    </section>
  );
}