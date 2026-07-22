import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
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
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8"
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeaturesComponent />
                <PricingTable />
                <TestimonialsSection />
              </>
            }
          />
        </Routes>
      </motion.main>
      <FooterComponent />
    </HashRouter>
  );
}

export default App;