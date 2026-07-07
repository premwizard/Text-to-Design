import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TestimonialsComponent from './components/TestimonialsComponent';
import PortfolioComponent from './components/PortfolioComponent';
import FooterComponent from './components/FooterComponent';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';



function App() {
  return (
    <HashRouter>

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