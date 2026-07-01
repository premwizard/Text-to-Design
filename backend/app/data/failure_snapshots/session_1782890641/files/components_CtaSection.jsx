import React from 'react';

const CtaSection = () => {
  return (
    <section id="contact" className="bg-zinc-900 text-white py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Ready to Elevate Your Workflow?
        </h2>
        <p className="text-lg text-zinc-300 max-w-3xl mx-auto mb-10">
          Join hundreds of businesses already streamlining their operations with ApexFlow. Get started today and experience the difference.
        </p>
        <a
          href="#contact-form" // Placeholder for a contact form or demo request
          className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-medium rounded-md text-white bg-zinc-600 hover:bg-zinc-700 transition-colors duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
        >
          Request a Demo
        </a>
      </div>
    </section>
  );
};

export default CtaSection;