import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function FooterWithSocial() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ];

  const productLinks = [
    { name: 'API Docs', href: '#' },
    { name: 'Integrations', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Pricing', href: '#' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#' },
    { icon: <Twitter size={20} />, href: '#' },
    { icon: <Linkedin size={20} />, href: '#' },
    { icon: <Instagram size={20} />, href: '#' },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-10">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <a href="#" className="text-3xl font-bold text-gray-100 mb-4 block h1 hover:opacity-90 transition-all duration-200 cursor-pointer">
              ChronoPay
            </a>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Your trusted partner for seamless and secure global transactions.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4 h3">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-blue-500 transition-all duration-200 cursor-pointer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4 h3">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-blue-500 transition-all duration-200 cursor-pointer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4 h3">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-blue-500 transition-all duration-200 cursor-pointer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between mt-10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} ChronoPay Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-blue-500 transition-all duration-200 cursor-pointer"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}