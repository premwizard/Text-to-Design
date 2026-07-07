import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

function HeroSection() {
  return (
    <section className="min-h-screen bg-white flex justify-center items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center space-y-4 md:space-y-6 lg:space-y-8">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-zinc-900">
          Empowering Innovation Through Technology
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-zinc-600">
          We help businesses like yours to innovate and grow through our cutting-edge technology solutions.
        </p>
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="bg-zinc-100 text-zinc-900 py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 rounded-md md:rounded-lg lg:rounded-xl hover:bg-zinc-200 flex items-center space-x-2"
        >
          <span>Discover More</span>
          <Star size={20} />
        </motion.button>
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 lg:space-x-8">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-zinc-100 rounded-md md:rounded-lg lg:rounded-xl p-4 md:p-6 lg:p-8 w-full md:w-1/2 lg:w-1/3"
          >
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-900">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-zinc-600">
              To empower businesses to innovate and grow through our cutting-edge technology solutions.
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-zinc-100 rounded-md md:rounded-lg lg:rounded-xl p-4 md:p-6 lg:p-8 w-full md:w-1/2 lg:w-1/3"
          >
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-900">
              Our Vision
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-zinc-600">
              To be the leading technology solutions provider for businesses.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-zinc-100/50 backdrop-blur-md"></div>
      <img
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
        alt="Background Image"
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
      />
    </section>
  );
}

export default HeroSection;