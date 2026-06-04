import React, { useState } from 'react';

export default function InquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 flex flex-col justify-center items-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 text-center mb-8">Get in Touch</h2>
      <div className="flex flex-col items-center">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="py-4 px-8 rounded-lg bg-transparent border border-neutral-800 hover:opacity-90 transition-all duration-200 cursor-pointer mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="py-4 px-8 rounded-lg bg-transparent border border-neutral-800 hover:opacity-90 transition-all duration-200 cursor-pointer mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" />
        <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className="py-4 px-8 rounded-lg bg-transparent border border-neutral-800 hover:opacity-90 transition-all duration-200 cursor-pointer mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" />
        <button className="bg-rose-400 text-neutral-800 py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-200 cursor-pointer mt-8">Send</button>
      </div>
    </section>
  );
}