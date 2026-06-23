import React, { useState } from 'react';

export default function GlitchyContactModule() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent! Thanks for reaching out.');
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  const glitchText = (text) => {
    return text.split('').map((char, i) => (
      <span 
        key={i} 
        className='relative inline-block transition-transform duration-300'
        style={{ transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` }}
      >
        {char}
      </span>
    ));
  };

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 bg-zinc-900">
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute inset-0 border-4 border-yellow-400 -m-4 -z-10"></div>
        <div className="border-4 border-zinc-950 p-8 bg-zinc-900 relative">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-yellow-400 uppercase tracking-wider ">
            {glitchText('Get In Touch')}
          </h2>
          <p className="text-lg leading-relaxed text-gray-300 mb-10">
            Ready to create something radical? Send us a message. We promise a response, not a bot.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold mb-2 text-yellow-400 uppercase">Name</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="w-full p-4 border-2 border-yellow-400 bg-zinc-950 text-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 placeholder-gray-500"
                placeholder="Your Name Here"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2 text-yellow-400 uppercase">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full p-4 border-2 border-yellow-400 bg-zinc-950 text-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 placeholder-gray-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold mb-2 text-yellow-400 uppercase">Message</label>
              <textarea 
                id="message" 
                rows="6" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required 
                className="w-full p-4 border-2 border-yellow-400 bg-zinc-950 text-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 placeholder-gray-500"
                placeholder="What are we building?"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-4 bg-yellow-400 text-zinc-950 font-bold uppercase disabled:opacity-50 hover:bg-yellow-300 transition-colors duration-200 shadow-lg shadow-yellow-400/30"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}