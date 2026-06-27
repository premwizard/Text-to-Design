import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: 'Shop', links: ['All Products', 'New Arrivals', 'Best Sellers', 'Deals'] },
    { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
    { title: 'Support', links: ['Contact Us', 'FAQs', 'Shipping', 'Returns'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
  ];

  const socialIcons = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-10 md:gap-8 mb-12">
          <div className="col-span-full md:col-span-1 lg:col-span-1 mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-3xl font-bold text-white mb-4 font-['DM Sans']">Nexus Market</h3>
            <p className="text-gray-400 text-sm font-['DM Sans']">
              Your ultimate destination for cutting-edge essentials and innovative tech.
            </p>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index} className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-4 font-['DM Sans']">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-purple-600 transition-colors duration-200 text-sm cursor-pointer font-['DM Sans']"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0 font-['DM Sans']">
            &copy; {currentYear} Nexus Market. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="text-gray-400 hover:text-purple-600 transition-colors duration-200 cursor-pointer"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}