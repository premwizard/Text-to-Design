import React from 'react';
import { Github, Twitter, Linkedin, Rocket } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Examples', href: '#examples' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const legalItems = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/cognitoflow' },
    { icon: Linkedin, href: 'https://linkedin.com/company/cognitoflow' },
    { icon: Github, href: 'https://github.com/cognitoflow' },
  ];

  return (
    <footer className="bg-zinc-800 border-t border-zinc-700/60 py-12 lg:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-16">
        {/* Brand Info */}
        <div className="col-span-full md:col-span-1">
          <a href="/" className="text-3xl font-bold text-gray-50 flex items-center mb-4 group">
            <Rocket className="mr-2 text-blue-400 group-hover:scale-110 transition-transform" size={32} />
            CognitoFlow
          </a>
          <p className="text-gray-400 leading-relaxed text-base">
            Unlocking creative potential with intelligent generation. Your partner in AI-powered content creation.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xl font-semibold text-gray-50 mb-6">Navigation</h4>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-gray-400 hover:text-blue-400 transition-all duration-200 text-base">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-xl font-semibold text-gray-50 mb-6">Legal</h4>
          <ul className="space-y-3">
            {legalItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-gray-400 hover:text-blue-400 transition-all duration-200 text-base">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-xl font-semibold text-gray-50 mb-6">Connect</h4>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all duration-200 cursor-pointer">
                <link.icon size={28} />
              </a>
            ))}
          </div>
          <p className="text-gray-400 mt-6 text-base">
            Stay updated with our latest features and news.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-700/60 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {currentYear} CognitoFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}