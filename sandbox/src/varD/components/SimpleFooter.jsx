import React from 'react';

export default function SimpleFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Contact Us', href: '#' },
  ];

  return (
    <footer className="py-12 px-6 lg:px-12 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="text-gray-400">
            &copy; {currentYear} NoirFlow. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          {footerLinks.map(link => (
            <a key={link.name} href={link.href} className="text-gray-400 hover:text-gray-300 transition-colors duration-200">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}