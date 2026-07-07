import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import TestimonialCarousel from './components/TestimonialCarousel';

function App() {
  return (
    <HashRouter>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
        body {
          font-family: 'DM Sans', sans-serif;
          background-color: #ffffff;
          color: #374151;
        }
      `}</style>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
      </Routes>
      <TestimonialCarousel />
      <Footer />
    </HashRouter>
  );
}

export default App;