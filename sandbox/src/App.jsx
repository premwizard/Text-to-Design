import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-between bg-white">
      <Navbar />
      <HeroSection />
      <Features />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;