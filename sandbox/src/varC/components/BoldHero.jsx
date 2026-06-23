import React from 'react'

export default function BoldHero() {
  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white">Abstract Canvas</h1>
      <p className="text-2xl md:text-3xl lg:text-4xl text-white mt-4">Where Imagination Takes Form</p>
      <button className="bg-red-500 hover:opacity-90 transition-all duration-200 cursor-pointer py-4 px-8 mt-8 text-white">Explore</button>
    </div>
  )
}