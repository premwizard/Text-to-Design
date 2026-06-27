import React from 'react';
import FloatingNavbar from './components/FloatingNavbar';
import GalleryHero from './components/GalleryHero';
import CuratedCollections from './components/CuratedCollections';
import FeaturedProductGrid from './components/FeaturedProductGrid';
import ProductCarousel from './components/ProductCarousel';
import SignUpNewsletter from './components/SignUpNewsletter';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700;800&family=Jost:wght@300;400;500;600&display=swap');
        body { font-family: 'Jost', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Cormorant Garamond', serif; }
      `}</style>
      <FloatingNavbar />
      <GalleryHero />
      <CuratedCollections />
      <FeaturedProductGrid />
      <ProductCarousel />
      <SignUpNewsletter />
      <Footer />
    </div>
  );
}