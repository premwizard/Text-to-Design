import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

function HeroSection() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
      author: 'John Doe',
      title: 'CEO, Example Inc.',
    },
    {
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
      author: 'Jane Doe',
      title: 'CTO, Example Inc.',
    },
    {
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
      author: 'Bob Smith',
      title: 'Founder, Example Inc.',
    },
  ];

  const handleNextTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center bg-white md:px-20 px-4">
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-1/2 xl:w-1/2 p-6">
              <h1 className="text-5xl font-bold leading-tight text-zinc-900">Elevate Your Digital Horizon</h1>
              <p className="text-lg text-zinc-600 mt-4">Transform your business with our innovative solutions and expert guidance.</p>
              <button
                className="bg-zinc-900 text-white py-2 px-4 rounded-md hover:bg-zinc-800 transition duration-300 mt-4"
              >
                Discover More <ArrowRight size={20} />
              </button>
            </div>
            <div className="w-full lg:w-1/2 xl:w-1/2 p-6">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Hero Image" className="w-full h-full object-cover object-center" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-zinc-100 py-12">
        <div className="container mx-auto p-4 md:p-6 lg:p-12 xl:p-24">
          <h2 className="text-3xl font-bold leading-tight text-zinc-900 mb-4">What Our Customers Say</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-1/2 xl:w-1/2 p-6">
              <div className="bg-white p-6 rounded-md shadow-md">
                <p className="text-lg text-zinc-600">{testimonials[testimonialIndex].quote}</p>
                <div className="flex items-center mt-4">
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=100&q=80" alt="Author Image" className="w-12 h-12 object-cover object-center rounded-full" />
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-zinc-900">{testimonials[testimonialIndex].author}</h3>
                    <p className="text-lg text-zinc-600">{testimonials[testimonialIndex].title}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 xl:w-1/2 p-6 flex justify-between">
              <button
                className="bg-zinc-200 text-zinc-600 py-2 px-4 rounded-md hover:bg-zinc-300 transition duration-300"
                onClick={handlePrevTestimonial}
              >
                Previous
              </button>
              <button
                className="bg-zinc-200 text-zinc-600 py-2 px-4 rounded-md hover:bg-zinc-300 transition duration-300"
                onClick={handleNextTestimonial}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-zinc-900 py-12">
        <div className="container mx-auto p-4 md:p-6 lg:p-12 xl:p-24">
          <div className="flex flex-wrap justify-between">
            <div className="w-full lg:w-1/3 xl:w-1/3 p-6">
              <h3 className="text-lg font-bold text-white mb-4">About Us</h3>
              <p className="text-lg text-zinc-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            </div>
            <div className="w-full lg:w-1/3 xl:w-1/3 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
              <p className="text-lg text-zinc-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            </div>
            <div className="w-full lg:w-1/3 xl:w-1/3 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Social Media</h3>
              <ul>
                <li className="text-lg text-zinc-300 mb-2"><a href="#" className="hover:text-white transition duration-300">Facebook</a></li>
                <li className="text-lg text-zinc-300 mb-2"><a href="#" className="hover:text-white transition duration-300">Twitter</a></li>
                <li className="text-lg text-zinc-300 mb-2"><a href="#" className="hover:text-white transition duration-300">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HeroSection;