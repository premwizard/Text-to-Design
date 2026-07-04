import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Integrations', href: '#' },
        { name: 'Security', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Support', href: '#' },
        { name: 'API', href: '#' },
        { name: 'Status', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-white py-12 md:py-16 border-t border-zinc-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <a href="/" className="text-3xl font-bold text-zinc-900 hover:text-zinc-700 transition-colors duration-300">
              SynapseFlow
            </a>
            <p className="text-zinc-600 mt-4 max-w-xs">
              Streamlining workflows with intelligent automation for a smarter future.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300">
                <Linkedin size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="col-span-1">
              <h4 className="text-lg font-semibold text-zinc-900 mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-zinc-600 hover:text-zinc-900 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-200 pt-8 text-center text-zinc-500 text-sm">
          &copy; {currentYear} SynapseFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;