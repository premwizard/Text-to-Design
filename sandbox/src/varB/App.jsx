import React from 'react';
import DynamicHeader from './components/DynamicHeader';
import FullBleedHero from './components/FullBleedHero';
import DesignerSpotlight from './components/DesignerSpotlight';
import CollectionShowcase from './components/CollectionShowcase';
import EditorialFeature from './components/EditorialFeature';
import LatestDrops from './components/LatestDrops';
import BrandStorySection from './components/BrandStorySection';
import NewsletterCallout from './components/NewsletterCallout';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-neutral-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }
      `}</style>
      <DynamicHeader />
      <FullBleedHero />
      <DesignerSpotlight />
      <CollectionShowcase />
      <EditorialFeature />
      <LatestDrops />
      <BrandStorySection />
      <NewsletterCallout />
      <Footer />
    </div>
  );
}