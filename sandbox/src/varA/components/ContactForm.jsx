import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // In a real application, you would send this data to a backend server.
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12 w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10 lg:p-12 text-gray-800">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-900 drop-shadow-sm">Get in Touch</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none
                         text-gray-800 placeholder-gray-500 transition-all duration-200"
              placeholder="Your Full Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none
                         text-gray-800 placeholder-gray-500 transition-all duration-200"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none
                         text-gray-800 placeholder-gray-500 transition-all duration-200"
              placeholder="Project Inquiry, Collaboration, etc."
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none
                         text-gray-800 placeholder-gray-500 resize-y transition-all duration-200"
              placeholder="Tell me about your project or inquiry..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-purple-500 text-white text-lg font-semibold rounded-full shadow-lg
                       hover:opacity-90 transition-all duration-200 cursor-pointer transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Send Message
            <Send className="ml-3" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}