import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';
import FooterSection from './components/FooterSection';

function App() {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

          html {
            scroll-behavior: smooth;
          }

          body {
            font-family: 'DM Sans', sans-serif;
            background-color: #fff; /* bg-white */
            color: #18181b; /* text-zinc-900 */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          h1, h2, h3, h4, h5, h6 {
            font-family: 'DM Sans', sans-serif;
          }
        `}
      </style>
      <div className="min-h-screen antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
          <CtaSection />
        </main>
        <FooterSection />
      </div>
    </>
  );
}

export default App;