import React from 'react'

export default function CallToAction() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-200 text-center mb-8">Unlock the Power of AI-Powered Automation</h2>
        <p className="text-lg lg:text-2xl text-gray-300 text-center mb-8">SynapseAI helps businesses streamline processes, enhance customer experiences, and increase productivity with AI-powered automation solutions.</p>
        <button className="bg-cyan-400 text-gray-200 py-4 px-8 rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer">Get Started Today</button>
      </div>
    </section>
  )
}