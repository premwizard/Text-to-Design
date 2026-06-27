import React from 'react';
import { Instagram, Linkedin, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 font-['Outfit', sans-serif]">Aura Creative</h3>
          <p className="text-lg mb-4">Crafting Digital Experiences, Beautifully.</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 ease-in-out">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 ease-in-out">
              <Linkedin size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 ease-in-out">
              <Twitter size={24} />
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 ease-in-out">
              <Youtube size={24} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 font-['Outfit', sans-serif]">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#hero" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">Home</a></li>
            <li><a href="#portfolio" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">Portfolio</a></li>
            <li><a href="#about" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">About</a></li>
            <li><a href="#contact" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 font-['Outfit', sans-serif]">Get In Touch</h4>
          <p className="flex items-center mb-2">
            <Mail size={20} className="mr-2 text-indigo-400 flex-shrink-0" />
            <a href="mailto:info@auracreative.com" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">info@auracreative.com</a>
          </p>
          <p className="text-sm text-gray-400">
            123 Creative Lane, Design City, DC 56789
          </p>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Aura Creative. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;