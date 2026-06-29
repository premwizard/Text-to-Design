import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, link: '#' },
    { id: 'users', name: 'Users', icon: Users, link: '#' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, link: '#' },
    { id: 'settings', name: 'Settings', icon: Settings, link: '#' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <div
      className={`relative h-screen bg-zinc-900 text-zinc-400 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } shadow-2xl border-r border-zinc-800`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center p-6 h-20 border-b border-zinc-800">
          {isOpen ? (
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-bold text-zinc-200 font-['DM_Sans']">
                DataSense Analytics
              </h1>
              <p className="text-xs text-zinc-500 font-['DM_Sans']">
                Transforming raw data into actionable insights.
              </p>
            </div>
          ) : (
            <img src="/path/to/your/logo.svg" alt="Logo" className="h-8 w-8" />
          )}
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className={`flex items-center p-3 rounded-md transition-colors duration-200 font-['DM_Sans'] ${
                activeMenu === item.id
                  ? 'bg-zinc-700 text-zinc-200 shadow-md'
                  : 'hover:bg-zinc-700 hover:text-zinc-200'
              }`}
              onClick={() => handleMenuClick(item.id)}
            >
              <item.icon className="h-6 w-6 mr-4" />
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </a>
          ))}
        </nav>

        <div className="p-6">
          <a
            href="#"
            className="flex items-center p-3 rounded-md transition-colors duration-200 font-['DM_Sans'] hover:bg-zinc-700 hover:text-zinc-200"
          >
            <LogOut className="h-6 w-6 mr-4" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </a>
        </div>

        <button
          onClick={toggleSidebar}
          className={`absolute top-1/2 -right-3 transform -translate-y-1/2 bg-zinc-700 text-zinc-400 p-2 rounded-full border-2 border-zinc-800 hover:bg-zinc-600 transition-colors duration-200 ${
            isOpen ? '' : 'rotate-180'
          }`}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;