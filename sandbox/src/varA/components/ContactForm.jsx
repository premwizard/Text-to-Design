import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
    // In a real app, you would send this data to a backend.
  };

  return (
    <section className="py-20 px-8 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Let's Create Something Amazing</h2>
        <div className="max-w-3xl mx-auto bg-white p-12 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-xl font-semibold mb-3 text-gray-800">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xl font-semibold mb-3 text-gray-800">Your Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xl font-semibold mb-3 text-gray-800">Your Message</label>
              <textarea
                id="message"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-pink-500 text-white py-4 px-10 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}