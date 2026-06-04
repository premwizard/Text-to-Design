import React from 'react';
import InvitingHero from './components/InvitingHero.jsx';
import ProductCards from './components/ProductCards.jsx';
import OurStorySection from './components/OurStorySection.jsx';
import CustomerTestimonials from './components/CustomerTestimonials.jsx';
import SimpleFooter from './components/SimpleFooter.jsx';

export default function App() {
  return (
    <div className="bg-amber-50 min-h-screen text-stone-700">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Lora', sans-serif; }
      `}</style>
      <InvitingHero />
      <ProductCards />
      <OurStorySection />
      <CustomerTestimonials />
      <SimpleFooter />
    </div>
  );
}