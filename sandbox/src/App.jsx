import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutSection from './components/AboutSection';
import PortfolioGrid from './PortfolioGrid';
import ContactSection from './ContactSection';
import GridContainer from './GridContainer';
import SpacingRules from './SpacingRules';
import { motion } from 'framer-motion';

function App() {
  return (
    <HashRouter>
      <div className="h-screen overflow-y-scroll bg-white">
        <Navbar />
        <GridContainer>
          <SpacingRules />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/testimonials" element={<TestimonialsSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/portfolio" element={<PortfolioGrid />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </GridContainer>
      </div>
    </HashRouter>
  );
}

export default App;