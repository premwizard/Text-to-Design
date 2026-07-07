import React from 'react';
import { HashRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import FooterComponent from './components/FooterComponent';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="h-screen overflow-hidden bg-white">
        <Navbar />
        <main className="flex flex-col items-center justify-center h-screen">
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
        </main>
        <FooterComponent />
      </div>
    </HashRouter>
  );
}

export default App;