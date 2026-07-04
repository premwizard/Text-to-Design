import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialCarousel from './components/TestimonialCarousel';
import PricingPlan from './components/PricingPlan';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

function App() {
  const pricingPlans = [
    {
      name: 'Starter',
      price: '29',
      frequency: 'month',
      features: [
        '5 Projects',
        'Basic Analytics',
        'Email Support',
        '10GB Storage',
      ],
      isPopular: false,
    },
    {
      name: 'Pro',
      price: '59',
      frequency: 'month',
      features: [
        'Unlimited Projects',
        'Advanced Analytics',
        'Priority Support',
        '100GB Storage',
        'Custom Integrations',
      ],
      isPopular: true,
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      frequency: '',
      features: [
        'Custom Solutions',
        'Dedicated Support',
        'On-premise Deployment',
        'Unlimited Storage',
        'SLA Guarantee',
      ],
      isPopular: false,
    },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

          body {
            font-family: 'DM Sans', sans-serif;
          }
        `}
      </style>
      <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          
          <section id="pricing" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 leading-tight">
                Flexible Pricing for Every Scale
              </h2>
              <p className="text-xl text-center text-zinc-700 mb-12 max-w-2xl mx-auto">
                Choose the plan that fits your needs and start streamlining your workflow today.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <PricingPlan key={index} {...plan} />
                ))}
              </div>
            </div>
          </section>

          <TestimonialCarousel />
          <CallToActionSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;