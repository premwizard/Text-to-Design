import React from 'react';

export default function AboutSummary() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}>
            Welcome to Aura Canvas
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Aura Canvas is where digital artistry meets strategic development. We are a collective of passionate designers and developers dedicated to crafting bespoke web experiences that leave a lasting impression. Our philosophy revolves around the idea that every digital presence should tell a unique story and engage its audience meaningfully.
          </p>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            From the initial concept to the final launch, we meticulously sculpt each pixel and line of code, ensuring that your vision is not just realized, but elevated. We believe in transparency, collaboration, and delivering solutions that are not only beautiful but also highly functional and future-proof.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-700 hover:bg-indigo-800 transition-all duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Let's Collaborate
          </a>
        </div>
        <div className="order-1 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1549692520-cb4f6973e2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt="Creative workspace with design tools and art elements"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}