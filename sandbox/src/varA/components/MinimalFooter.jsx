import React from 'react';

export default function MinimalFooter() {
  return (
    <footer className="py-10 text-zinc-800">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <p className="text-lg mb-2">AuraLuxe 2024. All rights reserved.</p>
        <ul className="flex flex-wrap justify-center mb-4">
          <li className="mr-4 mb-2"><a href="#" className="text-pink-400 hover:opacity-90 transition-all duration-200 cursor-pointer">About</a></li>
          <li className="mr-4 mb-2"><a href="#" className="text-pink-400 hover:opacity-90 transition-all duration-200 cursor-pointer">Contact</a></li>
          <li className="mr-4 mb-2"><a href="#" className="text-pink-400 hover:opacity-90 transition-all duration-200 cursor-pointer">FAQ</a></li>
        </ul>
      </div>
    </footer>
  );
}