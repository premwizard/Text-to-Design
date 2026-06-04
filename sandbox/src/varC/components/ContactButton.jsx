import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ContactButton() {
  return (
    <section id="contact" className="border-t-2 border-red-500 pt-20 text-center pb-20">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        Initiate_Project_Schema
      </h2>
      <p className="text-xl sm:text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto">
        Ready to engineer a digital presence that commands attention? Let's connect and deconstruct your vision into a concrete plan.
      </p>
      <a
        href="mailto:contact@visionaryworks.com"
        className="inline-flex items-center bg-red-500 text-white text-xl sm:text-2xl font-bold px-10 py-5 uppercase border-2 border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-200 cursor-pointer shadow-red-500 shadow-lg"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        CONTACT_VISIONARYWORKS <ArrowRight className="ml-4 w-7 h-7" />
      </a>
      <p className="text-sm text-zinc-500 mt-8">
        &copy; {new Date().getFullYear()} VisionaryWorks. All rights reserved.
      </p>
    </section>
  );
}