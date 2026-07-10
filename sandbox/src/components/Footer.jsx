import React from 'react';
import { motion } from 'framer-motion';
import * as LucideReact from 'lucide-react';

const { Twitter, Linkedin, Github, Mail } = LucideReact;

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3">
            <img src="https://via.placeholder.com/40x40/0000FF/FFFFFF?text=IH" alt="InnovateHub Logo" className="h-10 w-10 rounded-full" />
            <span className="text-3xl font-bold font-heading text-white">InnovateHub</span>
          </div>

          <div className="flex space-x-6">
            <motion.a href="#" className="hover:text-white transition duration-300" variants={linkVariants} whileHover={{ scale: 1.1 }}>
              <Twitter size={24} />
            </motion.a>
            <motion.a href="#" className="hover:text-white transition duration-300" variants={linkVariants} whileHover={{ scale: 1.1 }}>
              <Linkedin size={24} />
            </motion.a>
            <motion.a href="#" className="hover:text-white transition duration-300" variants={linkVariants} whileHover={{ scale: 1.1 }}>
              <Github size={24} />
            </motion.a>
            <motion.a href="#" className="hover:text-white transition duration-300" variants={linkVariants} whileHover={{ scale: 1.1 }}>
              <Mail size={24} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 pt-8 border-t border-gray-700 text-center text-sm"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={linkVariants}>
            © {new Date().getFullYear()} InnovateHub. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;