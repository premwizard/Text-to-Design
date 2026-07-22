import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesComponent from './components/FeaturesComponent';
import PricingTable from './components/PricingTable';
import TestimonialsSection from './components/TestimonialsSection';
import FooterComponent from './components/FooterComponent';
import './index.css';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection />
              <FeaturesComponent />
              <PricingTable />
              <TestimonialsSection />
              <FooterComponent />
            </motion.div>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;