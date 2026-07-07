import React from 'react';
import { House } from 'lucide-react';

function Navbar() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <nav className="bg-zinc-900 text-white py-4 md:px-20 px-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold">TechSphere</a>
        <ul className="hidden md:flex items-center space-x-4">
          <li>
            <a href="#" className="hover:text-zinc-500 transition duration-300">Home</a>
          </li>
          <li>
            <a href="#" className="hover:text-zinc-500 transition duration-300">About</a>
          </li>
          <li>
            <a href="#" className="hover:text-zinc-500 transition duration-300">Contact</a>
          </li>
        </ul>
        <button className="md:hidden bg-zinc-800 py-2 px-4 rounded-md hover:bg-zinc-700 transition duration-300">
          <House size={24} />
        </button>
      </nav>
      <section className="bg-zinc-900 text-white py-20 md:px-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full mb-10 md:mb-0">
            <h1 className="text-5xl font-bold mb-4">Unlock Your Potential</h1>
            <p className="text-lg mb-8">Discover the power of TechSphere and take your business to the next level.</p>
            <a href="#" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Get Started</a>
          </div>
          <div className="md:w-1/2 w-full">
            <img src="https://via.placeholder.com/500" alt="Hero Image" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
      <section className="py-20 md:px-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="flex flex-col md:flex-row items-center space-x-4">
            <div className="md:w-1/3 w-full mb-10 md:mb-0">
              <blockquote className="bg-zinc-100 p-4 rounded-md">
                <p className="text-lg">TechSphere has been a game-changer for our business. The support team is always available and the features are top-notch.</p>
                <footer className="text-lg mt-4">- John Doe, CEO of XYZ Corporation</footer>
              </blockquote>
            </div>
            <div className="md:w-1/3 w-full mb-10 md:mb-0">
              <blockquote className="bg-zinc-100 p-4 rounded-md">
                <p className="text-lg">I was blown away by the ease of use and the customization options. TechSphere is a must-have for any business.</p>
                <footer className="text-lg mt-4">- Jane Smith, Founder of ABC Startup</footer>
              </blockquote>
            </div>
            <div className="md:w-1/3 w-full mb-10 md:mb-0">
              <blockquote className="bg-zinc-100 p-4 rounded-md">
                <p className="text-lg">The team at TechSphere is always innovating and pushing the boundaries. I'm excited to see what the future holds.</p>
                <footer className="text-lg mt-4">- Bob Johnson, CTO of DEF Company</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-zinc-900 text-white py-10 md:px-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-10 md:mb-0">
            <h3 className="text-lg font-bold mb-4">TechSphere</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-zinc-500 transition duration-300">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-500 transition duration-300">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-500 transition duration-300">Contact</a>
              </li>
            </ul>
          </div>
          <div className="mb-10 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-zinc-500 transition duration-300">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-500 transition duration-300">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-500 transition duration-300">Support</a>
              </li>
            </ul>
          </div>
          <div className="mb-10 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Social Media</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-zinc-500 transition duration-300">Twitter</a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-500 transition duration-300">Facebook</a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-500 transition duration-300">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Navbar;