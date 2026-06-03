import React from 'react';

export default function DashboardFooter() {
  return (
    <footer className="mt-12 py-8 border-t border-white/10 text-center text-gray-400 text-sm font-inter">
      <p className="mb-2">&copy; {new Date().getFullYear()} InsightFlow. All rights reserved.</p>
      <div className="flex justify-center space-x-6">
        <a href="#" className="hover:text-emerald-500 transition-colors duration-200">Privacy Policy</a>
        <a href="#" className="hover:text-emerald-500 transition-colors duration-200">Terms of Service</a>
        <a href="#" className="hover:text-emerald-500 transition-colors duration-200">Support</a>
      </div>
    </footer>
  );
}