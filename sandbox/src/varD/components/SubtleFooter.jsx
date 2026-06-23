import React from 'react';

export default function SubtleFooter() {
  return (
    <footer className="bg-stone-950 py-4 mt-8 text-stone-100">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2024 Echoes Digital</p>
        <ul className="flex items-center space-x-4">
          <li><a href="#" className="text-stone-100 hover:opacity-90 transition-all duration-200 cursor-pointer">Terms of Service</a></li>
          <li><a href="#" className="text-stone-100 hover:opacity-90 transition-all duration-200 cursor-pointer">Privacy Policy</a></li>
        </ul>
      </div>
    </footer>
  );
}