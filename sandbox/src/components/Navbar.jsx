import React from 'react';
import { Link } from 'react-router-dom';
import { Bars, X } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 flex justify-between items-center w-full">
      <div className="flex items-center">
        <Link to="/" className="text-lg font-bold text-slate-900">
          ApexLaunch
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/features" className="text-slate-900 hover:text-slate-800">
          Features
        </Link>
        <Link to="/pricing" className="text-slate-900 hover:text-slate-800">
          Pricing
        </Link>
        <Link to="/testimonials" className="text-slate-900 hover:text-slate-800">
          Testimonials
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-slate-100 hover:bg-slate-200 text-slate-900 py-2 px-4 rounded-md">
          Login
        </button>
        <button className="bg-slate-100 hover:bg-slate-200 text-slate-900 py-2 px-4 rounded-md">
          Sign Up
        </button>
      </div>
      <button className="lg:hidden bg-slate-100 hover:bg-slate-200 text-slate-900 py-2 px-4 rounded-md">
        <X />
      </button>
    </nav>
  );
}

export default Navbar;