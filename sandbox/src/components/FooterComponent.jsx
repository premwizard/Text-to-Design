import React from 'react';
import { User, MessageSquare, Camera } from 'lucide-react';

function FooterComponent() {
  return (
    <footer className="bg-white py-12 md:py-24 lg:py-48">
      <div className="container mx-auto p-12 md:p-24 lg:p-48">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h3 className="text-xl text-slate-900 font-bold mb-2">About Us</h3>
            <p className="text-lg text-slate-900 mb-4">NexusApp is a software company that provides innovative solutions for businesses.</p>
          </div>
          <div>
            <h3 className="text-xl text-slate-900 font-bold mb-2">Social Media</h3>
            <ul>
              <li className="text-lg text-slate-900 mb-2">
                <a href="#" className="flex items-center">
                  <User size={20} className="text-indigo-500 mr-2" />
                  <span>Facebook</span>
                </a>
              </li>
              <li className="text-lg text-slate-900 mb-2">
                <a href="#" className="flex items-center">
                  <MessageSquare size={20} className="text-indigo-500 mr-2" />
                  <span>Twitter</span>
                </a>
              </li>
              <li className="text-lg text-slate-900 mb-2">
                <a href="#" className="flex items-center">
                  <Camera size={20} className="text-indigo-500 mr-2" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl text-slate-900 font-bold mb-2">Contact Us</h3>
            <p className="text-lg text-slate-900 mb-4">Email: <a href="#" className="text-indigo-500">support@nexusapp.com</a></p>
            <p className="text-lg text-slate-900 mb-4">Phone: <a href="#" className="text-indigo-500">+1 123 456 7890</a></p>
          </div>
        </div>
        <p className="text-lg text-slate-900 mt-4"> 2024 NexusApp. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default FooterComponent;