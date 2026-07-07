import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialCarousel from './components/TestimonialCarousel';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import { ArrowRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
          body {
            font-family: 'DM Sans', sans-serif;
            background-color: #ffffff;
            color: #444444;
          }
          .glassmorphism {
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
          }
        `}
      </style>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialCarousel />
      <PricingSection />
      <Footer />
    </div>
  );
}

export default App;