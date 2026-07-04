import React from 'react';

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-100 py-4 md:py-6 lg:py-8">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
        <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-8">2024 MetricStream. All rights reserved.</p>
        <ul className="flex justify-center items-center space-x-4">
          <li>
            <a href="/" className="hover:text-zinc-200 transition duration-200">Terms of Service</a>
          </li>
          <li>
            <a href="/" className="hover:text-zinc-200 transition duration-200">Privacy Policy</a>
          </li>
          <li>
            <a href="/" className="hover:text-zinc-200 transition duration-200">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;