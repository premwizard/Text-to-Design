import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import BentoFeatures from './components/BentoFeatures';
import TestimonialCarousel from './components/TestimonialCarousel';
import PricingPlan from './components/PricingPlan';
import TransactionTable from './components/TransactionTable';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
          body {
            font-family: 'DM Sans', sans-serif;
            background-color: #f8fafc; /* Light slate background for better contrast */
            color: #334155;
          }
        `}
      </style>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <BentoFeatures />
              <TestimonialCarousel />
              <PricingPlan />
              <TransactionTable />
            </>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;