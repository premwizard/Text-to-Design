import React from 'react'

export default function InteractiveDemo() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-200 text-center mb-8">Experience the Power of AI-Powered Automation</h2>
        <div className="flex flex-col items-center">
          <button className="bg-cyan-400 text-gray-200 py-4 px-8 rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer">Start Your Free Trial</button>
          <p className="text-lg text-gray-300 text-center mt-4">Try SynapseAI today and discover the benefits of AI-powered automation for yourself.</p>
        </div>
      </div>
    </section>
  )
}