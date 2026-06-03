import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 py-8">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-lg text-gray-300">2023 SynapseAI. All rights reserved.</p>
        <div className="flex justify-center mt-4">
          <a href="#" className="text-gray-300 hover:text-cyan-400 transition-all duration-200 cursor-pointer mr-4">Terms of Service</a>
          <a href="#" className="text-gray-300 hover:text-cyan-400 transition-all duration-200 cursor-pointer mr-4">Privacy Policy</a>
          <a href="#" className="text-gray-300 hover:text-cyan-400 transition-all duration-200 cursor-pointer">Contact Us</a>
        </div>
      </div>
    </footer>
  )
}