import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TestimonialCarousel from './components/TestimonialCarousel';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
      </style>
      <div className="bg-white text-zinc-900">
        <Navbar />
        <HeroSection />
        <TestimonialCarousel />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;