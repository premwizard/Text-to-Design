import React from 'react';
import BoldHeader from './components/BoldHeader';
import MinimalHero from './components/MinimalHero';
import ProductCardGrid from './components/ProductCardGrid';
import StatementCallout from './components/StatementCallout';
import CategoryBlocks from './components/CategoryBlocks';
import RawImageGallery from './components/RawImageGallery';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-stone-900 min-h-screen text-stone-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Space+Mono:wght@300;400;500;600&display=swap');
        body { font-family: 'Space Mono', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <BoldHeader />
      <main>
        <MinimalHero />
        <ProductCardGrid />
        <StatementCallout />
        <CategoryBlocks />
        <RawImageGallery />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;