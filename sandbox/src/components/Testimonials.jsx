import React from 'react';
import TestimonialCard from './TestimonialCard';

function Testimonials() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-slate-900">
        What Our Customers Say
      </h2>
      <div className="flex flex-wrap justify-center">
        <TestimonialCard quote="ApexLaunch has been a game-changer for my business." image="https://images.unsplash.com/photo-1656675511558-4a4f0a9c5e5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" name="John Doe" />
        <TestimonialCard quote="ApexLaunch is so easy to use!" image="https://images.unsplash.com/photo-1656675511558-4a4f0a9c5e5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" name="Jane Doe" />
      </div>
    </section>
  );
}

export default Testimonials;