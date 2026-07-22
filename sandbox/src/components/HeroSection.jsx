import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function HeroSection() {
  const img = "https://images.unsplash.com/photo-1518791841217-8f162f1ee18e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdfMXx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

  return (
    <section
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="container mx-auto p-12 pt-24 md:p-24 lg:pt-48">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold text-white"
        >
          Elevate Your Business
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-white mt-4"
        >
          NexusApp is the ultimate solution for your business needs.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-8"
        >
          Get Started
          <ArrowRight className="ml-2" />
        </motion.button>
      </div>
    </section>
  );
}

export default HeroSection;