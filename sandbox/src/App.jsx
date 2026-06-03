import React, { useState } from 'react';
import DashboardSidebar from './components/DashboardSidebar';
import AnalyticsHeader from './components/AnalyticsHeader';
import TimeSeriesChart from './components/TimeSeriesChart';
import KeyMetricsGrid from './components/KeyMetricsGrid';
import GeographicMap from './components/GeographicMap';
import DataTables from './components/DataTables';
import DashboardFooter from './components/DashboardFooter';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-zinc-950 min-h-screen text-gray-300">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <div className="flex min-h-screen">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-emerald-500/10 backdrop-blur-md rounded-lg border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all duration-200"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8">
          <AnalyticsHeader />

          <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <TimeSeriesChart />
            </div>
            <div className="lg:col-span-1">
              <GeographicMap />
            </div>
            <div className="lg:col-span-3">
              <KeyMetricsGrid />
            </div>
            <div className="lg:col-span-3">
              <DataTables />
            </div>
          </main>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}