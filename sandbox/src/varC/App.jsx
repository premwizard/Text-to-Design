import React from 'react';
import CompactNavbar from './components/CompactNavbar';
import GreetingHeader from './components/GreetingHeader';
import BentoProjectsGrid from './components/BentoProjectsGrid';
import ExpertiseShowcase from './components/ExpertiseShowcase';
import TestimonialCarousel from './components/TestimonialCarousel';
import CallToActionStrip from './components/CallToActionStrip';
import MinimalFooter from './components/MinimalFooter';

export default function App() {
  return (
    <div className="bg-neutral-100 min-h-screen text-neutral-800">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
          body { font-family: 'DM Sans', sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: 'DM Sans', sans-serif; }
        `}
      </style>
      <CompactNavbar brandName="Pixelcraft Collective" />
      <GreetingHeader />
      <BentoProjectsGrid />
      <ExpertiseShowcase />
      <TestimonialCarousel />
      <CallToActionStrip />
      <MinimalFooter />
    </div>
  );
}