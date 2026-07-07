import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-100 py-4 md:py-6">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-lg text-zinc-100">
          &copy; 2024 TechSphere. All rights reserved.
        </p>
        <ul className="flex space-x-4">
          <li>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-zinc-100"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-zinc-100"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-zinc-100"
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex space-x-4"
        >
          <Shield size={24} className="text-zinc-100" />
          <p className="text-lg text-zinc-100">Secure and trusted</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;