import React from 'react';

export default function Navbar() {
  return (
    <nav className="p-4 border-b border-zinc-800 flex justify-between bg-zinc-950">
      <span className="font-bold text-white">NexaTech</span>
      <button className="bg-indigo-650 text-white px-3 py-1 rounded">Login</button>
    </nav>
  );
}