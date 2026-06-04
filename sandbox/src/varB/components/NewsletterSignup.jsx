import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <section className="flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 border border-gray-600" />
        <button type="submit" className="bg-yellow-500 hover:opacity-90 transition-all duration-200 cursor-pointer p-2 text-white">Sign up</button>
      </form>
    </section>
  );
}