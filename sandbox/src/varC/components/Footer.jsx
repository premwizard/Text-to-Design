import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Shipping & Returns', href: '#' },
    { name: 'FAQ', href: '#' },
  ];

  return (
    <footer className="bg-stone-900 text-stone-100 py-10 px-6 md:px-12 border-t border-stone-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg font-['Space_Mono']">&copy; {currentYear} Concrete Goods. All rights reserved.</p>
        </div>

        <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-300 text-sm uppercase font-semibold font-['Space_Mono'] tracking-wider
                         hover:text-red-600 transition-colors duration-200
                         hover:opacity-90 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}