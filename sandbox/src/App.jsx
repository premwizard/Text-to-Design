import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TestimonialsSection from './components/TestimonialsSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#39bff3] text-zinc-150">
      <Navbar />
      <HeroSection />
      <TestimonialsSection />
    </div>
  );
}