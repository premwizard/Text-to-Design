import React from 'react';
import { motion } from 'framer-motion';
import backgroundImg from 'https://source.unsplash.com/1920x1080/?background-image';

function HeroSection() {
  return (
    <section className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="container mx-auto p-12 md:p-24 lg:p-48">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-playfair-display leading-tight text-white"
        >
          Capture Your Story
        </motion.h1>
        <motion.p
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-2xl font-inter leading-relaxed text-white mt-4"
        >
          Tell your story with FocalPoint, the ultimate platform for creatives.
        </motion.p>
        <motion.button
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition duration-300"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
}

export default HeroSection;