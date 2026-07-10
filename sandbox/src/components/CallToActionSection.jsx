import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CallToActionSection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          alt="Abstract background pattern"
          className="w-full h-full object-cover"
        />
      </div>
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
          Ready to Innovate?
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl mb-10 opacity-90">
          Let's turn your groundbreaking ideas into reality. Start your journey with InnovateHub today.
        </p>
        <motion.button
          className="flex items-center justify-center mx-auto px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl shadow-xl hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          Get Started Now
          <ArrowRight className="ml-4 w-7 h-7" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CallToActionSection;