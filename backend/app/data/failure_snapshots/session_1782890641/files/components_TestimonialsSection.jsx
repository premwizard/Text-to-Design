import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "ApexFlow has completely transformed our operations. The automation features are incredibly powerful, saving us countless hours every week. Highly recommended!",
    name: "Jane Doe",
    title: "CTO, Tech Solutions Inc.",
    rating: 5,
  },
  {
    quote: "We've seen a significant increase in efficiency and a reduction in errors since implementing ApexFlow. The analytics dashboard provides insights we never had before.",
    name: "John Smith",
    title: "Operations Manager, Global Logistics",
    rating: 5,
  },
  {
    quote: "The ease of use and the robust feature set of ApexFlow made our transition to automated workflows seamless. Our team loves it!",
    name: "Sarah Chen",
    title: "Product Lead, Creative Agency",
    rating: 4,
  },
  {
    quote: "ApexFlow's customer support is exceptional, and the platform itself is a game-changer. It's an indispensable tool for our growing business.",
    name: "Michael Lee",
    title: "CEO, Startup Hub",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-zinc-50 text-zinc-900 py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-zinc-700 max-w-2xl mx-auto">
            Hear from businesses worldwide who are achieving more with ApexFlow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-md flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:bg-zinc-100"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < testimonial.rating ? '#facc15' : 'currentColor'} // yellow-400
                    strokeWidth={i < testimonial.rating ? 0 : 1}
                    className={i < testimonial.rating ? 'text-yellow-400' : 'text-zinc-300'}
                  />
                ))}
              </div>
              <p className="text-lg text-zinc-800 italic mb-6 flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="font-semibold text-zinc-900">
                {testimonial.name}
              </div>
              <div className="text-sm text-zinc-600">
                {testimonial.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;