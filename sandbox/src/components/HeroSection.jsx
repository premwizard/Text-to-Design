import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ArrowRight } from 'lucide-react';
const backgroundImg = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';

function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-zinc-900"
        >
          Elevate Your Digital Horizon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg text-zinc-600"
        >
          Discover the latest trends and insights in the tech industry
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex space-x-4"
        >
          <button className="bg-zinc-900 text-zinc-100 py-2 px-4 rounded-md">
            Learn More
          </button>
          <button className="bg-zinc-100 text-zinc-900 py-2 px-4 rounded-md">
            Get Started
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex space-x-4 mt-4"
        >
          <div className="bg-zinc-100 p-4 rounded-md shadow-md">
            <Star size={24} className="text-zinc-900" />
            <p className="text-lg text-zinc-900">4.5/5</p>
          </div>
          <div className="bg-zinc-100 p-4 rounded-md shadow-md">
            <Heart size={24} className="text-zinc-900" />
            <p className="text-lg text-zinc-900">1000+ Reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;