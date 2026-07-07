import React from 'react';
import lucide from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';

function AboutSection() {
  const logo = "https://raw.githubusercontent.com/lucide-react/lucide/main/assets/logo.png";
  const bgImage = "https://images.unsplash.com/photo-1523204548574-9f5a7d1f9f8d";

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <h2 className="text-3xl font-bold mb-4">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.span>
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="bg-white p-8 shadow-md rounded-md w-full md:w-1/2">
            <h3 className="text-lg font-bold mb-2">
              Our Story
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Showcase Your Art is a platform that aims to provide a space for artists to showcase their work and connect with potential buyers.
            </p>
            <lucide.Icon name="book" size={20} className="text-gray-600" />
          </div>
          <div className="bg-white p-8 shadow-md rounded-md w-full md:w-1/2">
            <h3 className="text-lg font-bold mb-2">
              Our Mission
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Our mission is to provide a platform that is easy to use, accessible, and provides