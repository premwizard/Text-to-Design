import React, { useState } from 'react';
import { Send } from 'lucide-react';

const CallToActionSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      console.log('Subscribed with:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000); // Reset message after 5 seconds
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-zinc-700 to-zinc-900 text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ready to Elevate Your Workflow?
        </h2>
        <p className="text-xl text-zinc-200 mb-10 max-w-2xl mx-auto">
          Join thousands of businesses already optimizing their operations. Sign up for our newsletter to get the latest updates and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:flex-1 px-6 py-3 rounded-md bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 border border-zinc-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-zinc-50 text-zinc-900 font-semibold rounded-md hover:bg-zinc-200 transition-colors duration-300 ease-in-out flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Subscribe
            <Send size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        {subscribed && (
          <p className="mt-4 text-green-300 text-lg">Thank you for subscribing!</p>
        )}
      </div>
    </section>
  );
};

export default CallToActionSection;