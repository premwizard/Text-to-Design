import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-20 pb-12 bg-zinc-900/70 border-t border-zinc-700">
      <div className="container mx-auto px-8 lg:px-20 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="text-center md:text-left">
          <div className="text-2xl font-bold text-cyan-500 mb-3">LuminaFlow</div>
          <p className="text-sm text-gray-400">
            © {currentYear} LuminaFlow. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6v6M14 4L10 10"></path></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0v-1.5a2.5 2.5 0 00-5 0zm-1.5 5.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-3.75 3.75a.75.75 0 003 0v-3a.75.75 0 00-3 0v3z"></path></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 00-9-9m0 21a9 9 0 009-9M5 12a7 7 0 0113 0m0 0a7 7 0 01-13 0M5 12h2m0h2M7 12h.01M7 12a3 3 0 016 0m0 0a3 3 0 016 0M7 12h4.5a1.5 1.5 0 010 3h1.5a1.5 1.5 0 010 3H17m0 0v3m0 0a3 3 0 01-3 3H6a3 3 0 01-3-3v-3"></path></svg>
          </a>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left text-sm text-gray-400">
          <a href="#" className="hover:text-cyan-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cyan-500 transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}