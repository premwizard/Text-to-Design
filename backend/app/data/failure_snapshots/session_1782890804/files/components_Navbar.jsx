import React from 'react';
import { LayoutDashboard, BarChart2, Settings, UserCircle } from 'lucide-react';

const Navbar = ({ brandName }) => {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6 text-zinc-600" />
          <span className="text-xl font-bold text-zinc-900">{brandName}</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <NavLink icon={LayoutDashboard} text="Dashboard" active />
          <NavLink icon={BarChart2} text="Reports" />
          <NavLink icon={Settings} text="Settings" />
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50 transition-colors duration-200">
            <UserCircle className="h-6 w-6 text-zinc-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ icon: Icon, text, active }) => (
  <a
    href="#"
    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200
      ${active
        ? 'bg-zinc-100 text-zinc-800'
        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-700'
      }`}
  >
    <Icon className="h-4 w-4" />
    <span>{text}</span>
  </a>
);

export default Navbar;