import React from 'react';
import ParallaxHero from './components/ParallaxHero';
import ProductShowcase from './components/ProductShowcase';
import CustomerGallery from './components/CustomerGallery';
import FeaturedDesigner from './components/FeaturedDesigner';
import MinimalFooter from './components/MinimalFooter';

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-zinc-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700;800&family=Jost:wght@300;400;500;600&display=swap');
        body { font-family: 'Jost', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Cormorant Garamond', sans-serif; }
      `}</style>
      <ParallaxHero />
      <ProductShowcase />
      <CustomerGallery />
      <FeaturedDesigner />
      <MinimalFooter />
    </div>
  );
}