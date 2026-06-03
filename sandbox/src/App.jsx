import React from 'react'
import FloatingNavbar from './components/FloatingNavbar'
import HeroWithIllustration from './components/HeroWithIllustration'
import FeatureShowcase from './components/FeatureShowcase'
import ValueProposition from './components/ValueProposition'
import InteractiveDemo from './components/InteractiveDemo'
import TestimonialSlider from './components/TestimonialSlider'
import PricingTiers from './components/PricingTiers'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-gray-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <FloatingNavbar />
      <HeroWithIllustration />
      <FeatureShowcase />
      <ValueProposition />
      <InteractiveDemo />
      <TestimonialSlider />
      <PricingTiers />
      <CallToAction />
      <Footer />
    </div>
  )
}