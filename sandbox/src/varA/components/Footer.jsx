import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-12 md:py-16 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold text-zinc-100 mb-4 font-[Cormorant_Garamond]">
            Solstice Lux
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Elevating your everyday with curated elegance. Discover timeless pieces crafted with passion and precision.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-medium text-zinc-100 mb-4 font-[Cormorant_Garamond]">Quick Links</h4>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li><a href="#" className="hover:text-stone-100 transition-colors duration-200 cursor-pointer">About Us</a></li>
            <li><a href="#" className="hover:text-stone-100 transition-colors duration-200 cursor-pointer">Collections</a></li>
            <li><a href="#" className="hover:text-stone-100 transition-colors duration-200 cursor-pointer">New Arrivals</a></li>
            <li><a href="#" className="hover:text-stone-100 transition-colors duration-200 cursor-pointer">Gift Cards</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-medium text-zinc-100 mb-4 font-[Cormorant_Garamond]">Customer Service</h4>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li><a href="#" className="hover:text-stone-100 transition-colors duration-200 cursor-pointer">Contact Us</a></li>
            <li><a href="#" className="hover:text-stone-100 transition-colors duration-200 cursor-pointer">FAQs</a></li>
            <li><a href="#" className="hover:text-stone-100 transition-colors duration-200 cursor-pointer">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-stone-100 transition-colors duration-200 cursor-pointer">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-medium text-zinc-100 mb-4 font-[Cormorant_Garamond]">Connect With Us</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" aria-label="Instagram" className="text-zinc-400 hover:text-stone-100 transition-colors duration-200 cursor-pointer">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="Facebook" className="text-zinc-400 hover:text-stone-100 transition-colors duration-200 cursor-pointer">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="text-zinc-400 hover:text-stone-100 transition-colors duration-200 cursor-pointer">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Solstice Lux. All rights reserved.</p>
      </div>
    </footer>
  );
}