import React, { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this email to a server
    console.log('Email captured:', email);
    setSubmitted(true);
    setEmail(''); // Clear the input
  };

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6 font-['DM Sans']">Stay Connected with Nexus Market</h2>
        <p className="text-lg mb-8 opacity-90 font-['DM Sans']">
          Be the first to know about new arrivals, exclusive deals, and special offers. Join our newsletter today!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-2/3 md:w-1/2 p-4 rounded-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 font-['DM Sans']"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-purple-600 font-semibold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer flex items-center justify-center font-['DM Sans']"
          >
            Subscribe Now
          </button>
        </form>
        {submitted && (
          <p className="mt-6 text-green-200 text-md animate-fade-in font-['DM Sans']">
            Thank you for subscribing! Check your inbox for a confirmation.
          </p>
        )}
      </div>
    </section>
  );
}