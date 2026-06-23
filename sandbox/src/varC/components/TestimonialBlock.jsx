import React from 'react'

export default function TestimonialBlock() {
  const testimonials = [
    { quote: 'This is a great company', author: 'John Doe' },
    { quote: 'I love working with them', author: 'Jane Doe' },
    { quote: 'They are very professional', author: 'Bob Smith' },
  ]

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-8">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-md">
            <p className="text-white mb-2">{testimonial.quote}</p>
            <p className="text-white">{testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}