import React from 'react';
import { HashRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';

function App() {
  return (
    <HashRouter>
      <div className="font-sans">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </div>
    </HashRouter>
  );
}

export default App;