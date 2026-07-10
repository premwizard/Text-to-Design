import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import FooterComponent from './components/FooterComponent';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './index.css';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <HeroSection />
            <PortfolioSection />
            <AboutSection />
            <ContactSection />
            <FooterComponent />
          </motion.div>
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;