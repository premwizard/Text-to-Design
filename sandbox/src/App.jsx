import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'DM Sans', sans-serif; }
      `}</style>
      <div className="flex min-h-screen flex-col bg-white text-zinc-900">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <FeaturedProducts />
          <Categories />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;