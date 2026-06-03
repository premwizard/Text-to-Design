import React from 'react'

export default function HeroWithIllustration() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-200 text-center mb-4">Unlock Intelligent Automation for Your Business</h1>
        <p className="text-lg lg:text-2xl text-gray-300 text-center mb-8">SynapseAI helps you streamline processes, enhance customer experiences, and increase productivity with AI-powered automation solutions.</p>
        <button className="bg-cyan-400 text-gray-200 py-4 px-8 rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer">Get Started</button>
      </div>
    </section>
  )
}