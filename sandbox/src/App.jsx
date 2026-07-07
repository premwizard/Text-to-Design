import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import FooterComponent from './components/FooterComponent';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './App.css';

function App() {
  return (
    <HashRouter>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
          body {
            font-family: 'Open Sans', sans-serif;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <FooterComponent />
          </motion.div>
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;