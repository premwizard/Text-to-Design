import React from 'react';

export default function MinimalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center py-8 px-6">
      <p className="text-sm text-neutral-500">
        &copy; {currentYear} Pixelcraft Collective. All rights reserved.
      </p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="text-neutral-500 hover:text-teal-600 transition-all duration-200 cursor-pointer">Privacy Policy</a>
        <a href="#" className="text-neutral-500 hover:text-teal-600 transition-all duration-200 cursor-pointer">Terms of Service</a>
        <a href="#" className="text-neutral-500 hover:text-teal-600 transition-all duration-200 cursor-pointer">Contact Us</a>
      </div>
    </footer>
  );
}