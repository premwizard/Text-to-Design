import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 lg:py-24 bg-zinc-800 text-zinc-100">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <p className="text-lg mb-4">NexaHub &copy; 2023</p>
        <ul className="flex justify-center items-center mb-4">
          <li className="mx-2"><a href="#" className="text-zinc-100 hover:opacity-90 transition-all duration-200 cursor-pointer">Features</a></li>
          <li className="mx-2"><a href="#" className="text-zinc-100 hover:opacity-90 transition-all duration-200 cursor-pointer">Pricing</a></li>
          <li className="mx-2"><a href="#" className="text-zinc-100 hover:opacity-90 transition-all duration-200 cursor-pointer">About</a></li>
        </ul>
      </div>
    </footer>
  );
}