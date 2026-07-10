import React from 'react';
import { motion } from 'framer-motion';

function PortfolioSection() {
  const projectImages = [
    "https://images.unsplash.com/photo-1518791841217-8f162f1ee11b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdfMXx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1494548162494-384bbaabb9e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdfNXx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1504083898405-9ec6c76ea5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdfMnx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  ];

  return (
    <section id="portfolio" className="bg-white py-20 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto flex flex-col items-center justify-center z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-500 text-center">Our Portfolio</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl lg:text-2xl text-slate-900 text-center mt-4 md:mt-6 lg:mt-8">Take a look at some of our recent projects.</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-12 md:mt-16 lg:mt-20">
          {projectImages.map((image, index) => (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} key={index} className="bg-white shadow-md rounded-md relative overflow-hidden">
              <motion.img src={image} alt="Project Image" className="w-full h-full object-cover rounded-md" />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }} className="absolute bottom-0 left-0 right-0 bg-white py-2 px-4 rounded-b-md">
                <p className="text-lg md:text-xl lg:text-2xl text-slate-900">Project {index + 1}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;