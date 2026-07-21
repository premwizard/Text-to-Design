import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
// The following import caused an error because the file could not be resolved.
// import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white font-inter">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          {/* The HowItWorksSection component was removed as its import could not be resolved. */}
          {/* <HowItWorksSection /> */}
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