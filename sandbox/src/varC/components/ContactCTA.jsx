import React from 'react'

export default function ContactCTA() {
  return (
    <div className="h-screen flex justify-center items-center">
      <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-8">Get in Touch</h2>
      <button className="bg-red-500 hover:opacity-90 transition-all duration-200 cursor-pointer py-4 px-8 text-white">Contact Us</button>
    </div>
  )
}