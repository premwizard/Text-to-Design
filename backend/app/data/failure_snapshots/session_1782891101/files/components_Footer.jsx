import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-zinc-900 py-12 border-t border-zinc-100">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">LuminShop</h3>
          <p className="text-zinc-700 leading-relaxed">
            Discover simplicity in every purchase. We curate minimal and high-quality products to enhance your everyday life.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300">Home</a></li>
            <li><a href="#" className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300">Products</a></li>
            <li><a href="#" className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300">About Us</a></li>
            <li><a href="#" className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Social Media & Legal */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="text-zinc-700 hover:text-zinc-500 transition-colors duration-300">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-zinc-700 hover:text-zinc-500 transition-colors duration-300">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-zinc-700 hover:text-zinc-500 transition-colors duration-300">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-zinc-700 hover:text-zinc-500 transition-colors duration-300">
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-zinc-700 text-sm">
            &copy; {new Date().getFullYear()} LuminShop. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 text-sm mt-2">
            <li><a href="#" className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="#" className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;