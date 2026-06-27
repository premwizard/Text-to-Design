import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-stone-900 text-stone-100 border-b border-stone-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="lg:sticky top-10">
          <h2 className="text-4xl sm:text-5xl font-bold font-['Space_Grotesk'] tracking-tighter mb-8 uppercase">
            Connect with Us
          </h2>
          <p className="text-lg font-['Space_Mono'] leading-relaxed mb-8">
            For inquiries about custom orders, collaborations, or general feedback, reach out. We value direct communication.
          </p>
          <div className="space-y-4 text-stone-300 text-lg font-['Space_Mono']">
            <p><strong>Email:</strong> <a href="mailto:info@concretegoods.com" className="text-red-600 hover:underline hover:opacity-90 transition-opacity duration-200 cursor-pointer">info@concretegoods.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+15551234567" className="text-red-600 hover:underline hover:opacity-90 transition-opacity duration-200 cursor-pointer">+1 (555) 123-4567</a></p>
            <p>
              <strong>Studio:</strong>
              <br />
              17 Brutalist Way
              <br />
              Industrial District, CA 90210
            </p>
          </div>
        </div>

        <div className="bg-stone-800 p-8 md:p-12 border-2 border-stone-700">
          <h3 className="text-3xl font-bold font-['Space_Grotesk'] mb-8 text-stone-100 uppercase">
            Send a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold font-['Space_Grotesk'] uppercase tracking-wider text-stone-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-stone-900 border border-stone-600 text-stone-100 focus:ring-2 focus:ring-red-600 focus:outline-none transition-colors duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold font-['Space_Grotesk'] uppercase tracking-wider text-stone-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-stone-900 border border-stone-600 text-stone-100 focus:ring-2 focus:ring-red-600 focus:outline-none transition-colors duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold font-['Space_Grotesk'] uppercase tracking-wider text-stone-300 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-stone-900 border border-stone-600 text-stone-100 focus:ring-2 focus:ring-red-600 focus:outline-none transition-colors duration-200"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center bg-red-600 text-stone-100 uppercase font-bold font-['Space_Grotesk'] tracking-wider
                         py-3 px-6 border-2 border-red-600 w-full
                         hover:bg-transparent hover:text-red-600 transition-all duration-300
                         hover:opacity-90 cursor-pointer"
            >
              Submit Inquiry <ArrowRight className="ml-2" size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}