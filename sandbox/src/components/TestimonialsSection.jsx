import React from 'react';
import { motion } from 'framer-motion';
import testimonialImg1 from 'https://source.unsplash.com/400x400/?testimonial-image';
import testimonialImg2 from 'https://source.unsplash.com/400x400/?testimonial-image';
import customerLogo1 from 'https://source.unsplash.com/100x100/?customer-logo';
import customerLogo2 from 'https://source.unsplash.com/100x100/?customer-logo';

function TestimonialsSection() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto p-12 md:p-24 lg:p-48">
        <motion.h2
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-playfair-display leading-tight text-primary"
        >
          What Our Customers Say
        </motion.h2>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        >
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white p-6 rounded-md shadow-md"
          >
            <motion.p
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-lg font-inter leading-relaxed text-slate-900"
            >
              FocalPoint has helped me take my photography business to the next level.
            </motion.p>
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center space-x-2 mt-4"
            >
              <img src={testimonialImg1} alt="Testimonial Image" className="w-8 h-8 rounded-full" />
              <p className="text-lg font-inter leading-relaxed text-slate-900">John Doe</p>
              <img src={customerLogo1} alt="Customer Logo" className="w-8 h-8 rounded-full" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white p-6 rounded-md shadow-md"
          >
            <motion.p
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-lg font-inter leading-relaxed text-slate-900"
            >
              FocalPoint has been a game-changer for my videography business.
            </motion.p>
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center space-x-2 mt-4"
            >
              <img src={testimonialImg2} alt="Testimonial Image" className="w-8 h-8 rounded-full" />
              <p className="text-lg font-inter leading-relaxed text-slate-900">Jane Doe</p>
              <img src={customerLogo2} alt="Customer Logo" className="w-8 h-8 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;