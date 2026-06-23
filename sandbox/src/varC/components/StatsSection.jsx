import React, { useState, useEffect } from 'react'

export default function StatsSection() {
  const [count, setCount] = useState(0)
  const [stats, setStats] = useState([
    { title: 'Projects', value: 100 },
    { title: 'Clients', value: 50 },
    { title: 'Awards', value: 20 },
  ])

  useEffect(() => {
    let intervalId = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [count])

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-8">Our Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-md">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{stat.title}</h3>
            <p className="text-5xl md:text-7xl lg:text-9xl font-bold text-white">{count % stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}