import React from 'react';
import { motion } from 'framer-motion';

function ContactSection() {
  const contactImage = "https://images.unsplash.com/photo-1504083898405-9ec6c76ea5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdfMnx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

  return (
    <section id="contact" className="bg-gray-200 py-20 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto flex flex-col items-center justify-center z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-500 text-center">Get in Touch</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl lg:text-2xl text-slate-900 text-center mt-4 md:mt-6 lg:mt-8">Contact us to learn more about our services.</motion.p>
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center mt-12 md:mt-16 lg:mt-20">
          <motion.img initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} src={contactImage} alt="Contact Image" className="w-full md:w-1/2 lg:w-1/3 h-full object-cover rounded-md" />
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="md:ml-4 lg:ml-6 mt-4 md:mt-0 lg:mt-0">
            <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-500">Contact Form</motion.h3>
            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 md:mt-6 lg:mt-8">
              <motion.input initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} type="text" placeholder="Name" className="w-full md:w-1/2 lg:w-1/3 py-2 px-4 rounded-md" />
              <motion.input initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }} type="email" placeholder="Email" className="w-full md:w-1/2 lg:w-1/3 py-2 px-4 rounded-md mt-4 md:mt-6 lg:mt-8" />
              <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }} className="bg-indigo-500 hover:bg-fuchsia-500 transition duration-300 text-white py-2 px-4 rounded-md mt-4 md:mt-6 lg:mt-8">Submit</motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;