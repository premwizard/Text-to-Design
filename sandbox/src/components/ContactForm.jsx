import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react-native';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-lg mx-auto p-4 mb-8 md:p-6 lg:p-8 bg-zinc-800 rounded-md">
      <h2 className="text-2xl text-zinc-400 font-bold mb-4">Get in Touch</h2>
      <p className="text-zinc-500 mb-6">We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.</p>
      {isSubmitted ? (
        <div className="text-zinc-400 bg-zinc-700 p-4 rounded-md mb-4">
          <p>Thank you for your message. We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-zinc-400 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-2 pl-10 text-zinc-400 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-zinc-400 focus:border-zinc-400"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-400 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 pl-10 text-zinc-400 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-zinc-400 focus:border-zinc-400"
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-400 mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block w-full p-2 pl-10 text-zinc-400 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-zinc-400 focus:border-zinc-400"
              placeholder="Your message..."
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-zinc-400 bg-zinc-600 hover:bg-zinc-700 rounded-md focus:outline-none focus:ring-zinc-400 focus:border-zinc-400"
          >
            Send Message
          </button>
        </form>
      )}
      <div className="mt-6">
        <h3 className="text-zinc-400 font-bold mb-2">Get in Touch</h3>
        <ul>
          <li className="mb-2 flex items-center">
            <Mail size={20} className="mr-2 text-zinc-400" />
            <a href="mailto:info@auracreative.com" className="text-zinc-400 hover:text-zinc-200">info@auracreative.com</a>
          </li>
          <li className="mb-2 flex items-center">
            <Phone size={20} className="mr-2 text-zinc-400" />
            <a href="tel:1234567890" className="text-zinc-400 hover:text-zinc-200">123 456 7890</a>
          </li>
          <li className="flex items-center">
            <MapPin size={20} className="mr-2 text-zinc-400" />
            <span className="text-zinc-400">123 Main St, Anytown, USA</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactForm;