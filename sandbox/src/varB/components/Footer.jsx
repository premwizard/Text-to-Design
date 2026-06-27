import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const navigation = [
    { name: 'Shop All', href: '#' },
    { name: 'Designers', href: '#' },
    { name: 'Collections', href: '#' },
    { name: 'Journal', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Mail, href: '#', name: 'Email' },
  ];

  return (
    <footer className="bg-neutral-900 text-gray-200 py-16 md:py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <h3 className="text-3xl font-bold font-['Playfair_Display'] text-white mb-6">
            Atelier Noire
          </h3>
          <p className="text-gray-300 leading-relaxed text-md">
            Discover handcrafted elegance and timeless design from independent artisans worldwide.
          </p>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-medium text-white mb-4">Explore</h4>
            <ul className="space-y-3">
              {navigation.slice(0, 4).map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-all duration-200 cursor-pointer text-md"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {navigation.slice(4).map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-all duration-200 cursor-pointer text-md"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-1">
          <h4 className="text-xl font-medium text-white mb-4">Connect</h4>
          <div className="flex space-x-5 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                className="text-gray-300 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <link.icon className="h-7 w-7" />
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Atelier Noire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}