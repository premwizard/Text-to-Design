import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaDiscord } from 'lucide-react';

const Footer = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <footer className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <h2 className="text-5xl font-bold text-white mb-4">
              NexaTech
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Elevate Your Digital Horizon
            </p>
          </div>
          <div className="lg:text-left">
            <ul className="flex items-center space-x-6 mb-8 lg:mb-0">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                >
                  <FaTwitter size={24} className="text-gray-400 hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                >
                  <FaFacebook size={24} className="text-gray-400 hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                >
                  <FaInstagram size={24} className="text-gray-400 hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                >
                  <FaLinkedin size={24} className="text-gray-400 hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                >
                  <FaDiscord size={24} className="text-gray-400 hover:text-white" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="text-center lg:text-left">
              <p className="text-lg text-gray-400 mb-4">
                &copy; {new Date().getFullYear()} NexaTech. All rights reserved.
              </p>
            </div>
            <div className="text-center lg:text-right">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Learn More
              </button>
              <div className={`absolute top-0 right-0 ${isOpen ? 'block' : 'hidden'} lg:hidden`}>
                <div className="bg-gray-800 p-4 shadow-md rounded-xl">
                  <ul className="space-y-2">
                    <li>
                      <a
                        className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                        href="#"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                        href="#"
                      >
                        Services
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                        href="#"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;