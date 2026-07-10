import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <div className="font-body bg-white text-gray-900">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <PricingSection />
          <CallToActionSection />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;