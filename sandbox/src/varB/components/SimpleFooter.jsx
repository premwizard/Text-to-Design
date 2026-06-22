import React from 'react';

export default function SimpleFooter() {
  const brandName = "SynergyHub";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 bg-gray-800 text-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">{brandName}</h3>
          <p>&copy; {currentYear} {brandName}. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-500 transition-all duration-200 cursor-pointer">Privacy Policy</a>
          <a href="#" className="hover:text-blue-500 transition-all duration-200 cursor-pointer">Terms of Service</a>
          <a href="#" className="hover:text-blue-500 transition-all duration-200 cursor-pointer">Contact Us</a>
        </div>
        <div className="text-center">
          <p>Built for modern teams.</p>
        </div>
      </div>
    </footer>
  );
}