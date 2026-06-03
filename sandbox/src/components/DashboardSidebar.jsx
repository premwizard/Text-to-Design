import React from 'react';
import { 
  BarChart, 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  TrendingUp, 
  Globe, 
  DollarSign, 
  X 
} from 'lucide-react';

export default function DashboardSidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, link: '#' },
    { name: 'Analytics', icon: BarChart, link: '#' },
    { name: 'Reports', icon: FileText, link: '#' },
    { name: 'Trends', icon: TrendingUp, link: '#' },
    { name: 'Geo-Insights', icon: Globe, link: '#' },
    { name: 'Sales Data', icon: DollarSign, link: '#' },
    { name: 'Users', icon: Users, link: '#' },
    { name: 'Settings', icon: Settings, link: '#' },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 p-4 
        bg-white/5 backdrop-blur-lg border-r border-white/10 shadow-xl 
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
    >
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-3xl font-bold font-space-grotesk text-emerald-500">
          InsightFlow
        </h2>
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-2 text-gray-300 hover:text-emerald-500 transition-colors duration-200"
        >
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.link}
                className={`flex items-center p-3 rounded-lg text-gray-300 
                  hover:bg-emerald-500/20 hover:text-emerald-300 
                  transition-all duration-200 group
                  ${item.name === 'Dashboard' ? 'bg-emerald-500/20 text-emerald-300' : ''}
                `}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on nav item click
              >
                <item.icon className="mr-4 h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" />
                <span className="font-medium font-inter">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto px-2 py-4 border-t border-white/10 text-sm">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} InsightFlow</p>
        <p className="text-gray-500">All rights reserved.</p>
      </div>
    </aside>
  );
}