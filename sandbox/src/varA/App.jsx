import React from 'react';
import SidebarNav from './components/SidebarNav';
import DataSummaryCards from './components/DataSummaryCards';
import TimeSeriesChart from './components/TimeSeriesChart';
import GeographicHeatmap from './components/GeographicHeatmap';
import DetailedTable from './components/DetailedTable';
import UserActivityFeed from './components/UserActivityFeed';

export default function App() {
  return (
    <div className="bg-zinc-900 min-h-screen text-gray-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <SidebarNav />
      <div className="md:ml-64">
        <DataSummaryCards />
        <TimeSeriesChart />
        <GeographicHeatmap />
        <DetailedTable />
        <UserActivityFeed />
      </div>
    </div>
  );
}