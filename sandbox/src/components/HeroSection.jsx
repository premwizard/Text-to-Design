import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function HeroSection() {
  const heroImage = "https://images.unsplash.com/photo-1518791841217-8f162f1ee11b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdfMXx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

  return (
    <section id="hero" className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 py-20 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto flex flex-col items-center justify-center z-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">Showcasing Creativity</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl lg:text-2xl text-white text-center mt-4 md:mt-6 lg:mt-8">Welcome to NexusApp, where creativity meets innovation.</motion.p>
        <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white hover:bg-fuchsia-500 transition duration-300 text-indigo-500 py-2 px-4 rounded-md mt-8 md:mt-10 lg:mt-12">
          Learn More <ArrowRight size={20} />
        </motion.button>
        <motion.img initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }} src={heroImage} alt="Hero Image" className="w-full md:w-1/2 lg:w-1/3 absolute bottom-0 right-0 h-full object-cover rounded-md" />
      </div>
    </section>
  );
}

export default HeroSection;