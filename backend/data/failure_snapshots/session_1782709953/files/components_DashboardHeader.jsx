import React, { useState } from 'react';
import { Menu, Search, Bell, User, ChevronDown } from 'lucide-react';

const DashboardHeader = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 py-4 px-6 flex items-center justify-between shadow-md">
      {/* Left Section: Brand and Menu */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Menu className="h-6 w-6 text-zinc-400 cursor-pointer hover:text-zinc-300" />
          <span className="text-xl font-bold text-zinc-100 font-dm-sans">DataSense Analytics</span>
        </div>
        <span className="hidden md:inline-block text-sm text-zinc-500 font-dm-sans">
          Transforming raw data into actionable insights.
        </span>
      </div>

      {/* Right Section: Search, Notifications, Profile */}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div
          className={`relative flex items-center bg-zinc-800 rounded-md px-3 py-2 ${
            isSearchFocused ? 'ring-2 ring-zinc-600 shadow-lg' : ''
          }`}
        >
          <Search className="h-5 w-5 text-zinc-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-zinc-200 placeholder-zinc-500 focus:outline-none font-dm-sans"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-2">
          <button
            className={`px-3 py-2 rounded-md ${
              selectedFilter === 'all' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-400 hover:text-zinc-300'
            }`}
            onClick={() => setSelectedFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-2 rounded-md ${
              selectedFilter === 'today' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-400 hover:text-zinc-300'
            }`}
            onClick={() => setSelectedFilter('today')}
          >
            Today
          </button>
          <button
            className={`px-3 py-2 rounded-md ${
              selectedFilter === 'yesterday' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-400 hover:text-zinc-300'
            }`}
            onClick={() => setSelectedFilter('yesterday')}
          >
            Yesterday
          </button>
        </div>

        {/* Notifications */}
        <div className="relative p-2 rounded-md hover:bg-zinc-800 cursor-pointer">
          <Bell className="h-6 w-6 text-zinc-400 hover:text-zinc-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-2 text-zinc-300 hover:text-zinc-200 font-dm-sans"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center text-zinc-100 font-medium">
              JD
            </div>
            <span className="hidden sm:inline-block">John Doe</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-xl border border-zinc-700 py-1 font-dm-sans">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
              >
                Account Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
              >
                Support
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;