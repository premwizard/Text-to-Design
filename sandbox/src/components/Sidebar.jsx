import React, { useState, useEffect } from 'react';
import { HiMenuAlt3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-zinc-600 shadow-md z-10">
      <div className="flex items-center justify-between h-12 px-4 border-b border-gray-100">
        <Link to="/">
          <h1 className="text-lg font-bold text-zinc-400">DashSphere</h1>
        </Link>
        <button
          className="text-2xl hover:text-zinc-300 transition duration-300"
          onClick={toggleSidebar}
        >
          <HiMenuAlt3 />
        </button>
      </div>
      <div
        className={`flex flex-col justify-between h-screen overflow-y-auto ${
          isOpen ? 'w-64' : 'w-16'
        } transition duration-300`}
      >
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-between lg:h-screen lg:overflow-y-auto lg:w-64 lg:px-4 lg:bg-transparent lg:shadow-none">
          <div>
            {isOpen && (
              <div className="flex flex-col justify-between h-1/2">
                <div className="flex flex-col justify-between h-1/2">
                  <div className="flex flex-row items-center justify-between h-4">
                    <h2 className="text-md font-bold text-zinc-400">Menu</h2>
                    <button
                      className="text-2xl hover:text-zinc-300 transition duration-300"
                      onClick={toggleCollapse}
                    >
                      <HiMenuAlt3 />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-between py-2 hover:bg-zinc-700 transition duration-300"
                    >
                      <span className="text-sm text-zinc-400">Dashboard</span>
                      <span className="text-sm text-zinc-400">+</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center justify-between py-2 hover:bg-zinc-700 transition duration-300"
                    >
                      <span className="text-sm text-zinc-400">Settings</span>
                      <span className="text-sm text-zinc-400">+</span>
                    </Link>
                    <Link
                      to="/help"
                      className="flex items-center justify-between py-2 hover:bg-zinc-700 transition duration-300"
                    >
                      <span className="text-sm text-zinc-400">Help</span>
                      <span className="text-sm text-zinc-400">+</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <div className="flex flex-col justify-between h-screen">
            <div>
              <div className="flex flex-row items-center justify-between h-4">
                <h2 className="text-md font-bold text-zinc-400">Menu</h2>
                <button
                  className="text-2xl hover:text-zinc-300 transition duration-300"
                  onClick={toggleCollapse}
                >
                  <HiMenuAlt3 />
                </button>
              </div>
              <div className="flex flex-col">
                <Link
                  to="/dashboard"
                  className="flex items-center justify-between py-2 hover:bg-zinc-700 transition duration-300"
                >
                  <span className="text-sm text-zinc-400">Dashboard</span>
                  <span className="text-sm text-zinc-400">+</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center justify-between py-2 hover:bg-zinc-700 transition duration-300"
                >
                  <span className="text-sm text-zinc-400">Settings</span>
                  <span className="text-sm text-zinc-400">+</span>
                </Link>
                <Link
                  to="/help"
                  className="flex items-center justify-between py-2 hover:bg-zinc-700 transition duration-300"
                >
                  <span className="text-sm text-zinc-400">Help</span>
                  <span className="text-sm text-zinc-400">+</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;