import React from 'react';

export default function MinimalFooter() {
  return (
    <footer className="mt-24 py-10 border-t border-gray-200 bg-white/30 backdrop-blur-md rounded-t-xl mx-4 md:mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Selectify. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="/privacy" className="hover:text-blue-600 transition-colors duration-200 hover:opacity-90 cursor-pointer">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-600 transition-colors duration-200 hover:opacity-90 cursor-pointer">Terms of Service</a>
          <a href="/sitemap" className="hover:text-blue-600 transition-colors duration-200 hover:opacity-90 cursor-pointer">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}