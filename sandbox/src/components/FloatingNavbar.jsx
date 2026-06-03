import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function FloatingNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-zinc-900 z-10 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-cyan-400 text-lg font-bold">SynapseAI</a>
        <button className="lg:hidden flex justify-center w-8 h-8 bg-cyan-400 text-gray-200 rounded-full hover:opacity-90 transition-all duration-200 cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`lg:flex hidden justify-end items-center ${open ? 'block' : 'hidden'}`}
          >
          <li className="lg:ml-6 ml-0 lg:mt-0 mt-4">
            <a href="#" className="text-gray-200 hover:text-cyan-400 transition-all duration-200 cursor-pointer">Features</a>
          </li>
          <li className="lg:ml-6 ml-0 lg:mt-0 mt-4">
            <a href="#" className="text-gray-200 hover:text-cyan-400 transition-all duration-200 cursor-pointer">Pricing</a>
          </li>
          <li className="lg:ml-6 ml-0 lg:mt-0 mt-4">
            <a href="#" className="text-gray-200 hover:text-cyan-400 transition-all duration-200 cursor-pointer">About</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}