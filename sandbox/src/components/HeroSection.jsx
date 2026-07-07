import React from 'react';
import { motion } from 'framer-motion';
const background = 'https://images.unsplash.com/photo-1518791843675-64a75c1610f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
import { Icon } from 'lucide-react';

function HeroSection() {
  return (
    <section className="flex flex-col justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-playfair text-white mb-4"
      >
        Capture Your Story
      </motion.h1>
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-primary-color text-white py-2 px-4 rounded-lg hover:bg-secondary-color transition duration-300"
      >
        <Icon name="Camera" className="mr-2" />
        Get Started
      </motion.button>
    </section>
  );
}

export default HeroSection;