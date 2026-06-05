import React from 'react';
import { Rocket, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const productLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Integrations', href: '#' },
    { name: 'Security', href: '#' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Linkedin, href: 'https://linkedin.com' },
    { icon: Github, href: 'https://github.com' },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-white/10 py-16 text-gray-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="md:col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center font-space-grotesk text-3xl font-bold text-gray-50 mb-4">
              <Rocket className="h-8 w-8 text-cyan-500 mr-2" />
              OrbitFlow
            </a>
            <p className="text-md leading-relaxed max-w-sm">
              Streamlining your workflows to amplify your impact, one task at a time.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-500 transition-colors duration-200 cursor-pointer"
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-space-grotesk text-xl font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-cyan-500 transition-colors duration-200 text-md">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-space-grotesk text-xl font-semibold text-white mb-6">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-cyan-500 transition-colors duration-200 text-md">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-space-grotesk text-xl font-semibold text-white mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-cyan-500 transition-colors duration-200 text-md">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm">
          &copy; {currentYear} OrbitFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}