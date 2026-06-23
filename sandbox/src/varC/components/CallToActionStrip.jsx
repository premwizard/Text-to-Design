import React from 'react';

export default function CallToActionStrip() {
  return (
    <section className="bg-teal-600 px-6 py-16 lg:py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-lg text-white opacity-90 mb-8 max-w-3xl mx-auto">
          Let's collaborate to create digital experiences that captivate your audience and achieve your business goals.
        </p>
        <button className="bg-white text-teal-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition-all duration-200 cursor-pointer">
          Start Your Project Today
        </button>
      </div>
    </section>
  );
}