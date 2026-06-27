import React from 'react';
import { Star } from 'lucide-react';

export default function CustomerShowcase() {
  const testimonials = [
    {
      id: 1,
      name: 'Eleanor R.',
      city: 'Seattle, WA',
      quote: 'Nexus Market consistently delivers top-tier products. My new smart display is a game-changer for my home!',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: 2,
      name: 'Marcus K.',
      city: 'Austin, TX',
      quote: 'The customer service is outstanding, and the shipping was incredibly fast. Highly recommend for tech enthusiasts!',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    },
    {
      id: 3,
      name: 'Sophia L.',
      city: 'Miami, FL',
      quote: 'I found exactly what I needed at a great price. The quality of my new earbuds exceeded my expectations.',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/women/70.jpg',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-tr from-purple-50 via-white to-gray-50 relative overflow-hidden">
      {/* Gradient accent top-left */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      {/* Gradient accent bottom-right */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-14 font-['DM Sans']">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center text-center border-b-4 border-purple-600 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover mb-4 ring-4 ring-purple-300"
              />
              <p className="text-lg italic text-gray-700 mb-4 font-['DM Sans']">"{testimonial.quote}"</p>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`text-yellow-400 ${i < testimonial.rating ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <p className="font-semibold text-gray-900 font-['DM Sans']">{testimonial.name}</p>
              <p className="text-sm text-gray-600 font-['DM Sans']">{testimonial.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}