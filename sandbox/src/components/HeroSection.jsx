import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
const heroBackground = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80';

function HeroSection() {
  return (
    <section className="relative h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-transparent to-indigo-500" />
      <div className="container mx-auto p-4 md:p-8 lg:p-12 relative z-10">
        <h1 className="text-4xl font-bold text-white leading-tight mb-4">
          Elevate Your Business with NexusApp
        </h1>
        <p className="text-lg text-white leading-relaxed mb-8">
          Unlock new opportunities and streamline your workflow with our cutting-edge solutions.
        </p>
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
          <ArrowRight className="w-4 h-4 ml-2" />
        </motion.button>
        <div className="flex items-center justify-center mt-8">
          <CheckCircle className="w-8 h-8 text-white" />
          <p className="text-lg text-white leading-relaxed ml-2">
            Trusted by over 10,000 businesses worldwide
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;