import React, { useState } from 'react';

export default function SignUpNewsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 text-center">
      <h2 className="text-4xl md:text-5xl font-thin text-zinc-100 mb-6 font-[Cormorant_Garamond]">
        Stay Inspired. Join Solstice Lux.
      </h2>
      <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
        Receive exclusive updates, new collection previews, and special offers directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-2/3 p-3 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-400
                     focus:outline-none focus:ring-2 focus:ring-stone-100 focus:border-transparent transition-all duration-200"
          required
        />
        <button
          type="submit"
          className="w-full sm:w-1/3 bg-stone-100 text-zinc-950 px-6 py-3 rounded-full text-lg font-medium
                     hover:opacity-90 transition-all duration-200 cursor-pointer shadow-md"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}