import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TestimonialsSection from './components/TestimonialsSection';
import PortfolioGrid from './components/PortfolioGrid';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="bg-white h-screen">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        </style>
        <Navbar />
        <GridContainer>
          <SpacingContainer>
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="/testimonials" element={<TestimonialsSection />} />
              <Route path="/portfolio" element={<PortfolioGrid />} />
              <Route path="/about" element={<AboutSection />} />
            </Routes>
          </SpacingContainer>
        </GridContainer>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;