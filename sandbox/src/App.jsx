import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavbarComponent';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import FooterComponent from './components/FooterComponent';
import { motion } from 'framer-motion';
import './index.css';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Routes>
          <Route path="/" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <HeroSection />
              <FeaturesSection />
              <PricingSection />
            </div>
          } />
        </Routes>
      </motion.div>
      <FooterComponent />
    </HashRouter>
  );
}

export default App;