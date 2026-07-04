import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-800 py-10 md:py-12 lg:py-16 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
          &copy; {new Date().getFullYear()} TechPulse. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-6">
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-base md:text-lg">
            Privacy Policy
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-base md:text-lg">
            Terms of Service
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-base md:text-lg">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;