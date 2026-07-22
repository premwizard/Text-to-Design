import React from 'react';
import { motion } from 'framer-motion';
import { Copyright } from 'lucide-react';

function FooterComponent() {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto p-12 md:p-24">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-900"
        >
          2023 NexusApp. All rights reserved.
          <Copyright className="text-indigo-500 ml-2" />
        </motion.p>
      </div>
    </footer>
  );
}

export default FooterComponent;