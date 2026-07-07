import React from 'react';
import { motion } from 'framer-motion';
const portfolio1 = 'https://images.unsplash.com/photo-1584555114411-9b3f5d5f8e4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
const portfolio2 = 'https://images.unsplash.com/photo-1584555114411-9b3f5d5f8e4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
import { Icon } from 'lucide-react';

function PortfolioComponent() {
  return (
    <section className="flex flex-col justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${portfolio1})` }}>
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-playfair text-white mb-4"
      >
        Our Portfolio
      </motion.h1>
      <div className="flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center mb-4"
        >
          <img src={portfolio1} alt="Portfolio Item 1" className="w-64 h-64 object-cover rounded-lg" />