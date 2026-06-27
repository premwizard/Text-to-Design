import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function NewsletterCallout() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signed up with:', email);
    alert(`Thank you for subscribing, ${email}!`);
    setEmail('');
  };

  return (
    <section className="bg-gray-100 py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] text-neutral-900 mb-8 leading-tight">
          Stay Informed & Inspired
        </h2>
        <p className="text-xl md:text-2xl text-neutral-700 mb-10 leading-relaxed">
          Join the Atelier Noire community for exclusive insights, new collection alerts, and editorial content.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-2/3 lg:w-1/2 px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-900 text-lg text-neutral-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-neutral-900 text-white text-lg tracking-wide uppercase font-medium rounded-full
                       hover:opacity-90 transition-all duration-200 cursor-pointer"
          >
            Subscribe
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </form>
        <p className="text-sm text-neutral-600 mt-6">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}