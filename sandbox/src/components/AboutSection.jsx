import React from 'react';
import { motion } from 'framer-motion';

function AboutSection() {
  const aboutImage = "https://images.unsplash.com/photo-1494548162494-384bbaabb9e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdfNXx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

  return (
    <section id="about" className="bg-gray-100 py-20 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto flex flex-col items-center justify-center z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-500 text-center">About Us</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl lg:text-2xl text-slate-900 text-center mt-4 md:mt-6 lg:mt-8">Learn more about our team and our mission.</motion.p>
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center mt-12 md:mt-16 lg:mt-20">
          <motion.img initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} src={aboutImage} alt="About Image" className="w-full md:w-1/2 lg:w-1/3 h-full object-cover rounded-md" />
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="md:ml-4 lg:ml-6 mt-4 md:mt-0 lg:mt-0">
            <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-500">Our Team</motion.h3>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl lg:text-2xl text-slate-900 mt-4 md:mt-6 lg:mt-8">Meet the people behind NexusApp.</motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;