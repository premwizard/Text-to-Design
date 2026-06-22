import React, { useState } from 'react';

const testimonials = [
  {
    quote: "LuminaFlow has revolutionized how we handle our data. The platform is incredibly intuitive, and the automation saves us countless hours.",
    name: "Alice Johnson",
    title: "CTO, Innovatech Solutions",
    avatar: "/avatars/alice.jpg" // Placeholder path
  },
  {
    quote: "We struggled with data silos for years. LuminaFlow brought everything together seamlessly, giving us a unified view of our business operations.",
    name: "Bob Williams",
    title: "Head of Analytics, Growth Dynamics",
    avatar: "/avatars/bob.jpg" // Placeholder path
  },
  {
    quote: "The support team is fantastic, and the platform's reliability is top-notch. LuminaFlow is an essential tool for any data-driven company.",
    name: "Charlie Brown",
    title: "Data Engineer, CloudBurst Inc.",
    avatar: "/avatars/charlie.jpg" // Placeholder path
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-zinc-900 to-zinc-950">
      <div className="container mx-auto px-8 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-100">What Our Clients Say</h2>
        
        <div className="relative max-w-4xl mx-auto bg-zinc-800/50 border border-zinc-700 rounded-xl shadow-xl py-12 px-8 md:px-16">
          <div className="absolute inset-0 rounded-xl -z-10 overflow-hidden">
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/10 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-3xl rounded-full"></div>
          </div>
          
          <p className="text-2xl lg:text-3xl italic font-light text-center mb-8 text-gray-300 leading-relaxed">{currentTestimonial.quote}</p>
          
          <div className="flex flex-col items-center space-y-4">
            <img 
              src={currentTestimonial.avatar} 
              alt={currentTestimonial.name} 
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-500/40"
              onError={(e) => e.target.src = '/placeholder-avatar.png'} // Fallback image
            />
            <h4 className="text-xl font-semibold text-gray-100">{currentTestimonial.name}</h4>
            <p className="text-md text-gray-400">{currentTestimonial.title}</p>
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 bg-white/10 rounded-full p-3 hover:bg-white/20 transition-colors duration-300 focus:outline-none"
          >
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 bg-white/10 rounded-full p-3 hover:bg-white/20 transition-colors duration-300 focus:outline-none"
          >
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </section>
  );
}