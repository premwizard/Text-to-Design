import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroBackground from '../assets/hero-background.jpg';

function HeroSection() {
  return (
    <section className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="container mx-auto p-12 pt-24 md:p-24 lg:p-48">
        <h1 className="text-5xl text-white font-bold mb-4">Elevate Your Business</h1>
        <p className="text-xl text-white mb-8">NexusApp is the ultimate solution for your business needs.</p>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Get Started <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </section>
  );
}

export default HeroSection;