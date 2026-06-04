import React from 'react';
import BoldNavbar from './components/BoldNavbar';
import HeadlineHero from './components/HeadlineHero';
import GalleryGrid from './components/GalleryGrid';
import ProcessOverview from './components/ProcessOverview';
import NewsletterSignup from './components/NewsletterSignup';

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Space+Mono:wght@300;400;500;600&display=swap');
        body { font-family: 'Space Mono', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <BoldNavbar />
      <HeadlineHero />
      <GalleryGrid />
      <ProcessOverview />
      <NewsletterSignup />
    </div>
  );
}