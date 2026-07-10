import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://images.unsplash.com/photo-1517245386804-66fc1d9f5dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          alt="Abstract background pattern"
          className="w-full h-full object-cover"
        />
      </div>
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading text-gray-900 mb-6 leading-tight"
          variants={textVariants}
        >
          InnovateHub: Transforming Ideas into Impactful Solutions.
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          We provide the tools, expertise, and collaborative environment to bring your most ambitious projects to life.
        </motion.p>
        <motion.div variants={buttonVariants} transition={{ delay: 0.4 }}>
          <button className="flex items-center justify-center mx-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Get Started Today
            <ArrowRight className="ml-3 w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;