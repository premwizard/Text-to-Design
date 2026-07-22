import React from 'react';
import { Link } from 'react-router-dom';
import { Copyright } from 'lucide-react';

function FooterComponent() {
  return (
    <footer className="bg-white shadow-sm py-4 mt-12">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-slate-900 font-bold text-lg">
            NexusApp
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-slate-900 hover:text-indigo-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="text-slate-900 hover:text-indigo-500">
                Features
              </Link>
            </li>
            <li>
              <Link to="/" className="text-slate-900 hover:text-indigo-500">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-lg text-slate-900 mt-4">
          2023 NexusApp. All rights reserved.
          <Copyright className="ml-2" />
        </p>
      </div>
    </footer>
  );
}

export default FooterComponent;