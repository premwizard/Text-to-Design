import React from 'react';

export default function HeroSection() {
  return (
    <section className="py-20 text-center bg-neon-cyber-blue">
      <h1 className="text-4xl font-bold text-neon-cyber-blue-accent">Premium Analytics Platform</h1>
      <p className="text-zinc-400 mt-2">Scale your SaaS data efficiently</p>
      <button className="bg-neon-cyber-blue-accent text-white px-6 py-2.5 rounded-full mt-6">Get Started</button>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">What Our Clients Say</h2>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex."</p>
            <p className="text-gray-600 mt-2">- John Doe</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex."</p>
            <p className="text-gray-600 mt-2">- Jane Doe</p>
          </div>
        </div>
      </div>
    </section>
  );
}