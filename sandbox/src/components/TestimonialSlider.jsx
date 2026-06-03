import React from 'react'

export default function TestimonialSlider() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-200 text-center mb-8">What Our Customers Say</h2>
        <div className="flex flex-col items-center">
          <div className="bg-zinc-900 p-8 rounded-2xl w-full lg:w-1/2">
            <p className="text-lg text-gray-300">SynapseAI has revolutionized our business, enabling us to make data-driven decisions and drive growth.</p>
            <p className="text-lg text-gray-300">- Jane Doe, CEO of ABC Inc.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-2xl w-full lg:w-1/2 mt-8">
            <p className="text-lg text-gray-300">The SynapseAI team has been incredibly supportive, helping us to overcome challenges and achieve our goals.</p>
            <p className="text-lg text-gray-300">- Bob Johnson, CTO of DEF Corp.</p>
          </div>
        </div>
      </div>
    </section>
  )
}