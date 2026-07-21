const { Facebook, Twitter, Linkedin } = window.LucideReact;
import React from 'react';

const Footer = () => {
  const footerLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div>
            <img
              className="h-10 w-auto mb-4"
              src="https://via.placeholder.com/150x50?text=ApexConnect"
              alt="ApexConnect Logo"
            />
            <p className="text-sm">
              ApexConnect empowers your business with seamless integration and enhanced productivity.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition duration-300 ease-in-out text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
            <div className="flex space-x-5">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition duration-300 ease-in-out"
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t border-slate-700 text-center text-sm"
        >
          &copy; {new Date().getFullYear()} ApexConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;