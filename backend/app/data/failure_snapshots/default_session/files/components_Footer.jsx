import React from 'react';
import { Heart } from 'lucide-react';

function Footer() {
  const [testimonialIndex, setTestimonialIndex] = React.useState(0);

  const testimonials = [
    {
      text: 'TechSphere has been a game-changer for our business. Their software has increased our productivity and efficiency.',
      author: 'John Doe, CEO of XYZ Corporation',
    },
    {
      text: 'I was blown away by the ease of use and features of TechSphere\'s software. It\'s a must-have for any business.',
      author: 'Jane Smith, Founder of ABC Startup',
    },
    {
      text: 'TechSphere\'s software has helped us streamline our operations and reduce costs. I highly recommend it.',
      author: 'Bob Johnson, COO of DEF Company',
    },
  ];

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="bg-zinc-900 text-white">
      <header className="bg-zinc-900 text-white py-4 md:px-20 px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">TechSphere</h1>
        <nav className="flex items-center space-x-4">
          <a href="#" className="hover:text-zinc-500 transition duration-300">Features</a>
          <a href="#" className="hover:text-zinc-500 transition duration-300">Pricing</a>
          <a href="#" className="hover:text-zinc-500 transition duration-300">About</a>
        </nav>
      </header>
      <main className="md:px-20 px-4 py-10">
        <section className="hero bg-zinc-900 text-white py-20 md:px-20 px-4 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-4">Unlock Your Business Potential</h1>
          <p className="text-lg text-zinc-500 mb-8">Discover how TechSphere can help you streamline your operations and increase productivity.</p>
          <a href="#" className="bg-zinc-500 hover:bg-zinc-600 transition duration-300 py-4 px-8 text-lg font-bold rounded">Get Started</a>
        </section>
        <section className="testimonial bg-zinc-900 text-white py-10 md:px-20 px-4 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg text-zinc-500 mb-4">{testimonials[testimonialIndex].text}</p>
            <p className="text-lg text-zinc-500 mb-8">{testimonials[testimonialIndex].author}</p>
            <div className="flex items-center space-x-4">
              <button onClick={handlePrevTestimonial} className="bg-zinc-500 hover:bg-zinc-600 transition duration-300 py-2 px-4 text-lg font-bold rounded">
                Prev
              </button>
              <button onClick={handleNextTestimonial} className="bg-zinc-500 hover:bg-zinc-600 transition duration-300 py-2 px-4 text-lg font-bold rounded">
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-zinc-900 text-white py-4 md:px-20 px-4 flex justify-between items-center">
        <p className="text-lg text-zinc-500">&copy; 2023 TechSphere. All rights reserved.</p>
        <ul className="flex items-center space-x-4">
          <li>
            <a href="#" className="hover:text-zinc-500 transition duration-300">Terms of Service</a>
          </li>
          <li>
            <a href="#" className="hover:text-zinc-500 transition duration-300">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:text-zinc-500 transition duration-300">Contact Us</a>
          </li>
        </ul>
        <div className="flex items-center space-x-2">
          <Heart size={24} className="text-zinc-500" />
          <span className="text-lg text-zinc-500">Built with love by TechSphere</span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;