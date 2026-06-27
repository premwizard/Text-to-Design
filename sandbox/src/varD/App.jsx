import React from 'react';
import CleanNavbar from './components/CleanNavbar';
import GradientHero from './components/GradientHero';
import CategoryTabs from './components/CategoryTabs';
import FeaturedProductCarousel from './components/FeaturedProductCarousel';
import BenefitsGrid from './components/BenefitsGrid';
import CustomerShowcase from './components/CustomerShowcase';
import EmailCapture from './components/EmailCapture';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'DM Sans', sans-serif; }
      `}</style>
      <CleanNavbar />
      <GradientHero />
      <CategoryTabs />
      <FeaturedProductCarousel />
      <BenefitsGrid />
      <CustomerShowcase />
      <EmailCapture />
      <Footer />
    </div>
  );
}

export default App;