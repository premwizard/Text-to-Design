import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TestimonialsComponent from './components/TestimonialsComponent';
import PortfolioComponent from './components/PortfolioComponent';
import FooterComponent from './components/FooterComponent';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';
import 'tailwindcss/base';
import 'tailwindcss/components';
import 'tailwindcss/utilities';

const { ArrowRight } = Icon;

function App() {
  return (
    <HashRouter>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f7f7f7;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
      </style>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/testimonials" element={<TestimonialsComponent />} />
          <Route path="/portfolio" element={<PortfolioComponent />} />
          <Route path="/contact" element={<FooterComponent />} />
        </Routes>
      </motion.div>
      <FooterComponent />
    </HashRouter>
  );
}

export default App;