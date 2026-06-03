import React from 'react'

export default function FeatureShowcase() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-200 text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Automated Workflows</h3>
            <p className="text-lg text-gray-300">Streamline processes with AI-powered automation, enhancing productivity and efficiency.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Intelligent Decision-Making</h3>
            <p className="text-lg text-gray-300">Make data-driven decisions with AI-driven insights, empowering your business to thrive.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Real-Time Analytics</h3>
            <p className="text-lg text-gray-300">Gain real-time visibility into your operations, enabling swift adjustments and improvements.</p>
          </div>
        </div>
      </div>
    </section>
  )
}