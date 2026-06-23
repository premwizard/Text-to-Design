import React from 'react';

export default function FloatingContactButton() {
  return (
    <button
      className="fixed bottom-4 right-4 bg-purple-500 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded-md z-10"
      onClick={() => alert('Contact button clicked!')}
    >
      Contact Us
    </button>
  );
}