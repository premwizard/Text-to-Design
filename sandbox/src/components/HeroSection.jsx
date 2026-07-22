import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function HeroSection() {
  const img = "https://images.unsplash.com/photo-1519389950473-47ba27fcf35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdfMXx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

  return (
    <section
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${img})` }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 glassmorphism"
      >
        <h1 className="text-5xl font-bold text-slate-900">
          Elevate Your Business
        </h1>
        <p className="text-lg text-slate-900 mt-4">
          NexusApp is the ultimate solution for your business needs.
        </p>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-8">
          Get Started
          <ArrowRight className="ml-2" />
        </button>
      </motion.div>
    </section>
  );
}

export default HeroSection;