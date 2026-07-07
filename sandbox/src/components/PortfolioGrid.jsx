import React from 'react';
import { motion } from 'framer-motion';
import projectImg1 from 'https://source.unsplash.com/400x400/?project-image';
import projectImg2 from 'https://source.unsplash.com/400x400/?project-image';
import projectImg3 from 'https://source.unsplash.com/400x400/?project-image';

function PortfolioGrid() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto p-12 md:p-24 lg:p-48">
        <motion.h2
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-playfair-display leading-tight text-primary"
        >
          Our Portfolio
        </motion.h2>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols