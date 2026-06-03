import React from 'react'

export default function PricingTiers() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-200 text-center mb-8">Pricing Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Starter</h3>
            <p className="text-lg text-gray-300">$99/month</p>
            <ul>
              <li className="text-lg text-gray-300">5 users</li>
              <li className="text-lg text-gray-300">100 automation tasks</li>
            </ul>
            <button className="bg-cyan-400 text-gray-200 py-4 px-8 rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer mt-4">Sign Up</button>
          </div>
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Pro</h3>
            <p className="text-lg text-gray-300">$299/month</p>
            <ul>
              <li className="text-lg text-gray-300">20 users</li>
              <li className="text-lg text-gray-300">500 automation tasks</li>
            </ul>
            <button className="bg-cyan-400 text-gray-200 py-4 px-8 rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer mt-4">Sign Up</button>
          </div>
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Enterprise</h3>
            <p className="text-lg text-gray-300">Custom pricing</p>
            <ul>
              <li className="text-lg text-gray-300">Unlimited users</li>
              <li className="text-lg text-gray-300">Unlimited automation tasks</li>
            </ul>
            <button className="bg-cyan-400 text-gray-200 py-4 px-8 rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer mt-4">Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  )
}