import React from 'react';
import { Github, Twitter, Linkedin, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="backdrop-blur-lg bg-white/5 border-t border-white/10 py-12 px-4 md:px-8 lg:px-16 text-gray-300 font-inter">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-gray-50 hover:text-blue-500 transition-colors duration-200 font-space-grotesk">
            <Sparkles className="text-blue-500" size={28} />
            <span>SynthAI</span>
          </a>
          <p className="text-gray-400">Unleashing creativity through intelligent generation.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200 cursor-pointer">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200 cursor-pointer">
              <Github size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200 cursor-pointer">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-50 mb-2 font-space-grotesk">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-blue-500 transition-colors duration-200 font-inter">Features</a></li>
            <li><a href="#generate" className="hover:text-blue-500 transition-colors duration-200 font-inter">Generate</a></li>
            <li><a href="#gallery" className="hover:text-blue-500 transition-colors duration-200 font-inter">Gallery</a></li>
            <li><a href="#pricing" className="hover:text-blue-500 transition-colors duration-200 font-inter">Pricing</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-50 mb-2 font-space-grotesk">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-500 transition-colors duration-200 font-inter">Blog</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors duration-200 font-inter">Documentation</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors duration-200 font-inter">Support</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors duration-200 font-inter">API</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-50 mb-2 font-space-grotesk">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-500 transition-colors duration-200 font-inter">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors duration-200 font-inter">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors duration-200 font-inter">Security</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors duration-200 font-inter">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} SynthAI. All rights reserved.</p>
      </div>
    </footer>
  );
}