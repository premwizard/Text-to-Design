import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BentoFeatures from './components/BentoFeatures';
import TransactionTable from './components/TransactionTable';
import TestimonialCarousel from './components/TestimonialCarousel';
import PricingPlan from './components/PricingPlan';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import React from 'react';

function App() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-zinc-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <BentoFeatures />
          <TransactionTable />
          <TestimonialCarousel />
          <PricingPlan />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;