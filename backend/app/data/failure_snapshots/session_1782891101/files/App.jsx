import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductGridSection from './components/ProductGridSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
          body {
            font-family: 'DM Sans', sans-serif;
          }
        `}
      </style>
      <div className="min-h-screen bg-white text-zinc-900 antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <ProductGridSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;