import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function FooterLinks() {
  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#github' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin' },
    { name: 'Twitter', icon: Twitter, href: '#twitter' },
  ];

  return (
    <footer className="bg-gray-800 text-gray-200 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-10 md:space-y-0">
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Aura Canvas
          </h3>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            Crafting exceptional digital experiences that resonate and inspire. Let's build something remarkable together.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Quick Links
          </h4>
          <ul className="space-y-3">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 cursor-pointer text-lg"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Connect With Us
          </h4>
          <div className="flex space-x-6">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
                aria-label={item.name}
              >
                <item.icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-500 text-base">
        &copy; {new Date().getFullYear()} Aura Canvas. All rights reserved.
      </div>
    </footer>
  );
}