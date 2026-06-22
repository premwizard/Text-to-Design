import React from 'react';
import MagazineHero from './components/MagazineHero';
import EditorialFeatures from './components/EditorialFeatures';
import ImageGallery from './components/ImageGallery';
import ClientLogos from './components/ClientLogos';
import CallToAction from './components/CallToAction';

export default function App() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', sans-serif; }
      `}
      </style>
      <MagazineHero />
      <EditorialFeatures />
      <ImageGallery />
      <ClientLogos />
      <CallToAction />
    </div>
  );
}