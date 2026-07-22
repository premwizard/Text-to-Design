import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';

function Navbar() {
  return <nav>Navbar</nav>;
}

function HeroSection() {
  return <section>HeroSection</section>;
}

function FeaturesComponent() {
  return <section>FeaturesComponent</section>;
}

function PricingTable() {
  return <section>PricingTable</section>;
}

function TestimonialsSection() {
  return <section>TestimonialsSection</section>;
}

function FooterComponent() {
  return <footer>FooterComponent</footer>;
}

function App() {
  return (
    <HashRouter>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8"
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeaturesComponent />
                <PricingTable />
                <TestimonialsSection />
              </>
            }
          />
        </Routes>
      </motion.main>
      <FooterComponent />
    </HashRouter>
  );
}

export default App;