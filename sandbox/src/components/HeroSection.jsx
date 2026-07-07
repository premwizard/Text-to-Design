import React from 'react';
import lucide from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';

function HeroSection() {
  const bgImage = "https://images.unsplash.com/photo-1523204548574-9f5a7d1f9f8d";
  const logo = "https://raw.githubusercontent.com/lucide-react/lucide/main/assets/logo.png";

  return (
    <section className="h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50" />
      <div className="container mx-auto p-4 md:p-8 lg:p-12 relative z-10">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-white mb-4">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Showcase Your Art
            </motion.span>
          </h1>
          <p className="text-lg text-white mb-8">
            Discover the world of art and creativity
          </p>
          <button className="bg-primary-color text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300">
            <lucide.Icon name="paint-brush" size={20} className="mr-2" />
            Explore Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;