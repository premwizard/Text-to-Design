import React from 'react';
import { Rocket, Gem, Headset, ShieldCheck } from 'lucide-react';

export default function BenefitsGrid() {
  const benefits = [
    {
      icon: Rocket,
      title: 'Fast & Reliable Shipping',
      description: 'Get your cutting-edge essentials delivered swiftly to your doorstep with our optimized logistics.',
    },
    {
      icon: Gem,
      title: 'Premium Quality Products',
      description: 'We meticulously curate only the highest quality products, ensuring durability and superior performance.',
    },
    {
      icon: Headset,
      title: '24/7 Expert Support',
      description: 'Our dedicated customer service team is available around the clock to assist you with any inquiries.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Easy Payments',
      description: 'Shop with confidence using our encrypted and streamlined payment gateway for a hassle-free checkout.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-14 font-['DM Sans']">Why Choose Nexus Market?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-purple-600 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex justify-center mb-6">
                <benefit.icon className="w-12 h-12 text-purple-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-['DM Sans']">{benefit.title}</h3>
              <p className="text-gray-700 font-['DM Sans']">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}