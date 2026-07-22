import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import FeaturesComponent from './components/FeaturesComponent.jsx';
import PricingTable from './components/PricingTable.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import FooterComponent from './components/FooterComponent.jsx';
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