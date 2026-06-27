import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close dropdown if menu opens
    if (!isMenuOpen) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleDropdownItemClick = () => {
    closeDropdown();
    setIsMenuOpen(false); // Close mobile menu as well
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', dropdown: true },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Web Design', href: '/services/web' },
    { name: 'Branding', href: '/services/branding' },
    { name: 'SEO', href: '/services/seo' },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-lg border-b-2 border-gray-800 sticky top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-indigo-400 font-['Inter'] tracking-tight hover:text-indigo-300 transition-colors duration-300 ease-in-out">
            Aura Creative
          </a>
          <p className="ml-4 text-sm text-gray-400 font-['Inter'] hidden md:block opacity-80">
            Crafting Digital Experiences, Beautifully.
          </p>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            item.dropdown ? (
              <div key={item.name} className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-300 hover:text-white font-medium font-['Inter'] py-2 px-3 rounded-lg group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out"
                >
                  {item.name}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl border border-gray-700 font-['Inter'] z-20 transition-all duration-300 ease-in-out">
                    {services.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        onClick={handleDropdownItemClick}
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200 ease-in-out"
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white font-medium font-['Inter'] px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out"
              >
                {item.name}
              </a>
            )
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-md p-1 transition-colors duration-300">
            {isMenuOpen ? <X className="h-6 w-6 text-gray-400 hover:text-white" /> : <Menu className="h-6 w-6 text-gray-400 hover:text-white" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-gray-800 border-t border-gray-700 font-['Inter'] transition-all duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="w-full flex items-center justify-between text-left text-gray-300 hover:text-white font-medium py-2 px-3 rounded-lg group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out"
                  >
                    {item.name}
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="ml-4 mt-1 w-full bg-gray-700 rounded-lg shadow-lg border border-gray-600 font-['Inter'] transition-all duration-300 ease-in-out">
                      {services.map((service) => (
                        <a
                          key={service.name}
                          href={service.href}
                          onClick={handleDropdownItemClick}
                          className="block px-4 py-2 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg transition-colors duration-200 ease-in-out"
                        >
                          {service.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-300 hover:text-white font-medium px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out"
                >
                  {item.name}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;