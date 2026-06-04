import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative w-full max-w-4xl mx-auto p-8 lg:p-12 flex flex-col items-center justify-center text-center">
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 text-gray-800">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 drop-shadow-lg">
          <span className="text-purple-500">ArtisanAlloy</span>
          <br />
          Crafting Visual Narratives, Pixel by Pixel.
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          Specializing in bespoke digital experiences, I transform complex ideas into intuitive and engaging interfaces.
          Let's build something exceptional together.
        </p>
        <button className="inline-flex items-center px-8 py-4 bg-purple-500 text-white text-lg font-semibold rounded-full shadow-lg
                           hover:opacity-90 transition-all duration-200 cursor-pointer transform hover:-translate-y-1">
          Explore My Work
          <ArrowRight className="ml-3" size={24} />
        </button>
      </div>
      {/* Subtle background visual element for glassmorphism feel */}
      <div className="absolute inset-0 z-0 opacity-20" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 34v-4H0v4H4v2H0v4h2v-4h4v-2H2zm0-30V0H0v4H4v2H0v4h2V6h4V4H2zm0 14v-4H0v4H4v2H0v4h2v-4h4v-2H2zm0 14v-4H0v4H4v2H0v4h2v-4h4v-2H2zm0 14v-4H0v4H4v2H0v4h2v-4h4v-2H2zm56 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-14v-4h-2v4h-4v2h4v4h2V6h4V4h-4zm-28 0V0h-2v4h-4v2h4v4h2V6h4V4h-4zM28 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM14 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm42 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM42 2v4h4v2h-4v4h-2V6h-4V4h4V0h2v2zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM28 2v4h4v2h-4v4h-2V6h-4V4h4V0h2v2zM14 2v4h4v2h-4v4h-2V6h-4V4h4V0h2v2z" fill="%239C92AC"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
      </div>
    </div>
  );
}