import React from 'react';
import { motion } from 'framer-motion';

function FooterComponent() {
  return (
    <footer className="bg-gray-300 py-4 md:py-6 lg:py-8">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-lg md:text-xl lg:text-2xl text-slate-900 text-center"> 2023 NexusApp. All rights reserved.</motion.p>
      </div>
    </footer>
  );
}

export default FooterComponent;